import { createPromiseWithOutsideResolve } from './utils';

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

export type DBConfig = {
  objectStores: ObjectStoreParams[];
};

export const openDB = (
  config: DBConfig,
  name = 'ReactiveDB',
  version = 1,
): Promise<IDBDatabase> => {
  const DBOpenRequest = window.indexedDB.open(name, version);

  const [promise, promiseResolve, promiseReject] = createPromiseWithOutsideResolve<
    IDBDatabase,
    string
  >();

  if (!window.indexedDB) {
    promiseReject(
      "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.",
    );
  }

  DBOpenRequest.onsuccess = (event: Event): void => {
    const db = (event.target as IDBOpenDBRequest).result;
    registerErrorHandlers(db);
    promiseResolve(db);
  };

  DBOpenRequest.onerror = (event: Event): void => {
    promiseReject(`DB open error, code: ${(event.target as IDBOpenDBRequest)?.error}`);
  };

  DBOpenRequest.onupgradeneeded = (event: IDBVersionChangeEvent): void => {
    if (config.objectStores.some(({ name }) => !name)) {
      promiseReject(
        'Warning: Object store parameters were not provided on version change',
      );
      return;
    }

    config.objectStores.forEach((storeParams) =>
      handleDBUpgrade((event.target as IDBOpenDBRequest).result, storeParams),
    );
  };

  return promise;
};

function registerErrorHandlers(db: IDBDatabase): void {
  db.onerror = (event: Event): void => {
    console.log(`Database error: ${(event.target as DBErrorEventTarget)?.errorCode}`);
  };
}

function handleDBUpgrade(db: IDBDatabase, params: ObjectStoreParams): void {
  const { name, options, indexes, data } = params;
  const objectStore = db.createObjectStore(name, options);

  // Create an indexes
  indexes?.forEach(({ name, keyPath, options }) =>
    objectStore.createIndex(name, keyPath, options),
  );

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = (_: Event): void => {
    // Store values in the newly created objectStore.
    const dataObjectStore = db.transaction('items', 'readwrite').objectStore('items');
    data.forEach((item) => {
      dataObjectStore.add(item);
    });
  };
}
