import useDB from './use-db';

type Data = { value: Record<string, unknown>; key?: IDBValidKey };

function useUpdate(): typeof update {
  const { db, triggerUpdate } = useDB();

  function update(storeName: string, data: Data): void {
    if (!db) return;

    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);

    transaction.onerror = (event: Event): void => {
      console.log(event.type);
    };

    transaction.oncomplete = (_: Event): void => {
      triggerUpdate();
    };

    put(data, objectStore);
  }
  return update;
}

export default useUpdate;

function put(data: Data, objectStore: IDBObjectStore): void {
  const { value, key } = data;
  if (!key) {
    objectStore.put(value);
    return;
  }
  const request = objectStore.get(key);
  request.onsuccess = (_: Event): void => {
    const DBObject = request.result;
    Object.assign(DBObject, value);
    objectStore.put(DBObject, key);
  };
}
