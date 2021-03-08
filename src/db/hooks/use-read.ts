import { useState } from 'react';
import { compareStringifiedObjects } from '../utils';
import useDB from './use-db';

type Params = { key: IDBValidKey | IDBKeyRange };

function useRead<T extends Record<string, unknown> | Record<string, unknown>[]>(
  storeName: string,
  params: Params,
): T | null;

function useRead<T extends Record<string, unknown> | Record<string, unknown>[]>(
  storeName: string,
  params?: Params,
): T[] | null;

function useRead<T extends Record<string, unknown> | Record<string, unknown>[]>(
  storeName: string,
  params?: Params,
): T | null {
  const { db } = useDB();
  const [result, setResult] = useState<T | null>(null);

  if (!db) return null;
  if (result) return result;

  const transaction = db.transaction(storeName, 'readonly');
  const objectStore = transaction.objectStore(storeName);

  transaction.onerror = (event: Event): void => {
    console.log(event.type);
  };

  const request = params ? objectStore.get(params.key) : objectStore.getAll();

  request.onsuccess = (_: Event): void => {
    if (!compareStringifiedObjects(request.result, result)) {
      setResult(request.result);
    }
  };

  return result;
}

export default useRead;
