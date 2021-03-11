import { createPromiseWithOutsideResolvers } from './utils';

interface DBErrorEventTarget extends EventTarget {
  errorCode: string;
}

interface IndexParams {
  name: string;
  keyPath: string | string[];
  options?: IDBIndexParameters;
}

interface ObjectStoreParams {
  name: string;
  options?: IDBObjectStoreParameters;
  indexes?: IndexParams[];
  data: unknown[];
}

export type Config = {
  objectStores: ObjectStoreParams[];
  keepLastReadResults?: boolean;
  onOpen?: () => void;
};

export const openDB = (
  name: string,
  version: number,
  config: Config,
): Promise<IDBDatabase> => {
  const DBOpenRequest = window.indexedDB.open(name, version);

  const [promise, promiseResolve, promiseReject] = createPromiseWithOutsideResolvers<
    IDBDatabase,
    string
  >();

  if (!window.indexedDB) {
    promiseReject(
      "Your browser doesn't support a stable version of IndexedDB. Sme features will not be available.",
    );
  }

  DBOpenRequest.onsuccess = (event: Event): void => {
    const db = (event.target as IDBOpenDBRequest).result;
    db.onerror = (event: Event): void => {
      console.log((event.target as DBErrorEventTarget)?.errorCode);
    };
    promiseResolve(db);
  };

  DBOpenRequest.onerror = (event: Event): void => {
    promiseReject((event.target as IDBOpenDBRequest)?.error + '');
  };

  DBOpenRequest.onupgradeneeded = (event: IDBVersionChangeEvent): void => {
    if (config.objectStores.some(({ name }) => !name)) {
      promiseReject(
        'Warning: Object store parameters were not provided on version change',
      );
      return;
    }
    const db = (event.target as IDBOpenDBRequest).result;

    const newStores: ObjectStoreParams[] = [];
    const upgradedStores: ObjectStoreParams[] = [];
    config.objectStores.forEach((store) => {
      if (db.objectStoreNames.contains(store.name)) {
        upgradedStores.push(store);
      } else {
        newStores.push(store);
      }
    });

    createStores(db, newStores);
    upgradeStores(db, upgradedStores);
  };

  return promise;
};

function createStores(db: IDBDatabase, params: ObjectStoreParams[]): void {
  let objectStore: IDBObjectStore;
  const writers: (() => void)[] = [];
  params.forEach(({ name, options, indexes, data }) => {
    objectStore = db.createObjectStore(name, options);
    // Create an indexes
    indexes?.forEach(({ name, keyPath, options }) =>
      objectStore.createIndex(name, keyPath, options),
    );

    writers.push((): void => {
      // Store values in the newly created objectStore.
      const dataObjectStore = db.transaction(name, 'readwrite').objectStore(name);
      data.forEach((item) => {
        dataObjectStore.add(item);
      });
    });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = (_: Event): void => {
      writers.forEach((write) => write());
    };
  });
}

function upgradeStores(db: IDBDatabase, params: ObjectStoreParams[]): void {
  params.forEach(({ name, indexes }) => {
    const objectStore = db.transaction(name).objectStore(name);
    // Create an indexes
    indexes?.forEach(({ name, keyPath, options }) => {
      objectStore.deleteIndex(name);
      objectStore.createIndex(name, keyPath, options);
    });
  });
}
