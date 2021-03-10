import { UpdateData } from '../model';
import Store from '../store';
import { createPromiseWithOutsideResolvers } from '../utils';

type AsyncUpdateParams = {
  data: UpdateData | UpdateData[];
  db: IDBDatabase | null;
  onComplete: (event: Event) => void;
  onError?: (event: Event) => void;
};

export function asyncUpdate(storeName: string, params: AsyncUpdateParams): void {
  const { data, db, onComplete } = params;
  if (!db) {
    throw new Error('Error: database is not open');
  }

  const transaction = db.transaction(storeName, 'readwrite');
  const objectStore = transaction.objectStore(storeName);

  transaction.onerror = (event: Event): void => {
    params.onError && params.onError(event);
  };

  transaction.oncomplete = (event: Event): void => {
    onComplete(event);
  };
  if ((data as UpdateData[]).length === undefined) {
    if ((data as UpdateData).value !== null) {
      put(data as UpdateData, objectStore);
    } else {
      deleteItem(data as UpdateData, objectStore);
    }
  } else {
    (data as UpdateData[]).forEach((item) => put(item, objectStore));
  }
}

export function update<T>(
  storeName: string,
  data: UpdateData | UpdateData[],
): Promise<T> {
  const [promise, resolve, reject] = createPromiseWithOutsideResolvers<T, string>();

  function onComplete(): void {
    resolve((null as unknown) as T);
  }
  function onError(event: Event): void {
    reject(event.type);
  }
  asyncUpdate(storeName, { data, db: Store.getDB(), onComplete, onError });
  return promise;
}

function put(data: UpdateData, objectStore: IDBObjectStore): void {
  const { value, key } = data;
  if (!key) {
    objectStore.put(value);
    return;
  }
  const request = objectStore.get(key);
  request.onsuccess = (_: Event): void => {
    const DBObject = request.result;
    Object.assign(DBObject, value);
    objectStore.put(DBObject, key as IDBValidKey);
  };
}

function deleteItem(data: UpdateData, objectStore: IDBObjectStore): void {
  if (data.key === undefined) {
    throw new Error(`Error: Can't delete item without providing it's key!`);
  }
  objectStore.delete(data.key);
}