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

const IndexedDBProvider: React.FC<Props> = (props) => {
  const { name, version, config } = props;
  const [db, setDB] = useState<IDBDatabase | null>(null);
  const [transactionCountStore, setTransactionCount] = useState(
    createTransactionStore(config),
  );

  const triggerUpdate = useCallback(
    (storeName: string) => {
      console.log('update triggerred on ' + storeName);
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
      config.onOpen && config.onOpen();
      setDB(db);
    },
    [config, setDB],
  );

  useEffect(() => {
    openDB(name || 'ReactiveDB', version || 1, config)
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
