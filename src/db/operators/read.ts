import { BaseReadParams } from '../model';
import Store from '../store';
import { createPromiseWithOutsideResolvers } from '../utils';

interface AsyncReadParams<T> extends BaseReadParams {
  db: IDBDatabase | null;
  onSuccess: (result: T, event: Event) => void;
  onError?: (event: Event) => void;
}

export function asyncRead<T>(storeName: string, params: AsyncReadParams<T>): void {
  const { db, onSuccess } = params;
  if (!db) {
    throw new Error('Error: database is not open');
  }

  const transaction = db.transaction(storeName, 'readonly');
  const objectStore = transaction.objectStore(storeName);

  if (params?.key) {
    const request = objectStore.get(params.key);

    request.onsuccess = (event: Event): void => {
      onSuccess(request.result, event);
    };
  } else {
    const result: T[] = [];
    const keyRange = params.keyRange || null;
    const direction = params.direction || 'next';
    const request = objectStore.openCursor(keyRange, direction);
    request.onsuccess = (event: Event): void => {
      const cursor = (event.target as IDBRequest)?.result;
      if (cursor) {
        result.push(cursor.value);
        cursor.continue();
      } else {
        onSuccess((result as unknown) as T, event);
      }
    };
  }
  transaction.onerror = (event: Event): void => {
    params.onError && params.onError(event);
  };
}

export function read<T>(storeName: string, params?: BaseReadParams): Promise<T> {
  const [promise, resolve, reject] = createPromiseWithOutsideResolvers<T, string>();
  function onSuccess(result: T, _: Event): void {
    resolve(result);
  }
  function onError(event: Event): void {
    reject(event.type);
  }
  asyncRead(storeName, { ...params, db: Store.getDB(), onSuccess, onError });
  return promise;
}