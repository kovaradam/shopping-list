import { useState } from 'react';
import { DBRecord } from '../model';
import { asyncRead } from '../operators';
import { compareStringifiedObjects } from '../utils';
import useDB from './use-db';

type Params = { key?: IDBValidKey | IDBKeyRange; keepResults: boolean };

type ReadResult<T> = { value: T | null; transactionCount: number };

function useRead<T extends DBRecord | DBRecord[]>(
  storeName: string,
  params: Params,
): T | null;

function useRead<T extends DBRecord | DBRecord[]>(
  storeName: string,
  params?: Params,
): T[] | null;

function useRead<T extends DBRecord | DBRecord[]>(
  storeName: string,
  params?: Params,
): T | null {
  const { db, transactionCountStore, keepLastReadResults } = useDB();
  const transactionCount = transactionCountStore[storeName];
  const [lastResult, setLastResult] = useState<ReadResult<T | null>>(
    createReadResult(null, transactionCount),
  );

  if (!db) return null;
  if (lastResult.value && transactionCount === lastResult.transactionCount) {
    return lastResult.value;
  }

  if (!keepLastReadResults && !params?.keepResults) {
    lastResult.value = null;
  }

  function onSuccess(request: IDBRequest, _: Event): void {
    if (!compareStringifiedObjects(request.result, lastResult.value)) {
      const newResult = createReadResult(request.result, transactionCount);

      setLastResult(newResult);
    }
  }

  function onError(event: Event): void {
    console.log(event.type);
  }

  asyncRead(storeName, { key: params?.key, db, onSuccess, onError });

  return lastResult.value;
}

export default useRead;

function createReadResult<T>(value: T | null, transactionCount: number): ReadResult<T> {
  return { value, transactionCount };
}
