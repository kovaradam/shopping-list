import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { openDB, Config } from './init';
import Store from './store';

type Props = { name?: string; version?: number; config: Config };

export type Context = {
  db: IDBDatabase | null;
  triggerUpdate: (storeName: string) => void;
  transactionCountStore: Record<string, number>;
  keepLastReadResults?: boolean;
};

export const DBContext = React.createContext<Context | null>(null);
DBContext.displayName = 'ReactiveDBContext';

const defaultName = 'ReactiveDB';
const defaultVersion = 1;

const IndexedDBProvider: React.FC<Props> = (props) => {
  const { name, version, config } = props;
  const [db, setDB] = useState<IDBDatabase | null>(null);
  const [transactionCountStore, setTransactionCount] = useState(
    createTransactionStore(config),
  );

  const triggerUpdate = useCallback(
    (storeName: string) => {
      setTransactionCount((prevState) =>
        incrementStoreTransactionCount(prevState, storeName),
      );
    },
    [setTransactionCount],
  );

  const contextValue = useMemo(
    () => ({
      db,
      triggerUpdate,
      transactionCountStore,
      keepLastReadResults: config.keepLastReadResults,
    }),
    [triggerUpdate, db, transactionCountStore, config],
  );

  const onOpen = useCallback(
    (db: IDBDatabase) => {
      Store.setDB(db);
      Store.setTriggerUpdate(triggerUpdate);
      config.onOpen && config.onOpen();
      setDB(db);
    },
    [config, setDB, triggerUpdate],
  );

  useEffect(() => {
    openDB(name || defaultName, version || defaultVersion, config)
      .then((result) => onOpen(result))
      .catch((error) => console.log(error));
  }, [name, version, config, onOpen]);

  return <DBContext.Provider value={contextValue}>{props.children}</DBContext.Provider>;
};

export default IndexedDBProvider;

function createTransactionStore(config: Config): Record<string, number> {
  const store: ReturnType<typeof createTransactionStore> = {};
  config.objectStores.forEach(({ name }) => (store[name] = 0));
  return store;
}

function incrementStoreTransactionCount(
  prevState: Record<string, number>,
  storeName: string,
): Record<string, number> {
  const newState = { ...prevState };
  newState[storeName] = ++prevState[storeName];
  return newState;
}
