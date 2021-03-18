import { DBRecord } from './model';
import { createPromiseWithOutsideResolvers } from './utils';

interface IndexParams {
  name: string;
  keyPath: string | string[];
  options?: IDBIndexParameters;
}

export interface ObjectStoreParams {
  name: string;
  options?: IDBObjectStoreParameters;
  indexes?: IndexParams[];
  data?: DBRecord[];
  dataKey?: string;
}

export type Config = {
  name?: string;
  version?: number;
  objectStores: ObjectStoreParams[];
  keepLastReadResults?: boolean;
  onOpen?: () => void;
};

export const openDB = (config: Config): Promise<IDBDatabase> => {
  const name = config.name || 'ReactiveDB';
  const version = config.version || 1;
  const DBOpenRequest = window.indexedDB.open(name, version);

  const [promise, promiseResolve, promiseReject] = createPromiseWithOutsideResolvers<
    IDBDatabase,
    string
  >();

  if (!window.indexedDB) {
    promiseReject(
      "Your browser doesn't support a stable version of IndexedDB. Some features will not be available.",
    );
  }

  DBOpenRequest.onsuccess = (event: Event): void => {
    const db = (event.target as IDBOpenDBRequest).result;
    db.onerror = (event: Event): void => {
      throw new Error((event.target as IDBRequest)?.error + '');
    };
    promiseResolve(db);
  };

  DBOpenRequest.onerror = (event: Event): void => {
    promiseReject((event.target as IDBOpenDBRequest)?.error + '');
  };

  DBOpenRequest.onupgradeneeded = (_: IDBVersionChangeEvent): void => {
    if (config.objectStores.some(({ name }) => !name)) {
      promiseReject(
        'Warning: Object store parameters were not provided on version change',
      );
      return;
    }
    console.log('upgrade');

    upgradeStores(config.objectStores, DBOpenRequest);
  };

  return promise;
};

function upgradeStores(
  params: ObjectStoreParams[],
  DBOpenRequest: IDBOpenDBRequest,
): void {
  const { result: db, transaction } = DBOpenRequest;

  let objectStore: IDBObjectStore;
  const writers: (() => void)[] = [];

  params.forEach(({ name, options, indexes, data, dataKey }) => {
    if (db.objectStoreNames.contains(name)) {
      if (!transaction) return;
      objectStore = transaction.objectStore(name);
    } else {
      objectStore = db.createObjectStore(name, options);
    }

    indexes?.forEach(({ name, keyPath, options }) => {
      if (objectStore.indexNames.contains(name)) {
        objectStore.deleteIndex(name);
      }
      objectStore.createIndex(name, keyPath, options);
    });

    if (!data) return;

    writers.push((): void => {
      // Store values in the newly created objectStore.
      const dataObjectStore = db.transaction(name, 'readwrite').objectStore(name);
      data.forEach((item) => {
        if (dataObjectStore.keyPath) {
          dataObjectStore.add(item);
        } else {
          if (!dataKey) {
            throw new Error('Store uses out-of-line key and dataKey was not provided');
          }
          dataObjectStore.add(item, (item as any)[dataKey]);
        }
      });
    });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = (_: Event): void => {
      writers.forEach((write) => write());
    };
  });
}
