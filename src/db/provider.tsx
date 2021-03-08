import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { openDB, DBConfig } from './init';

type Props = { name?: string; version?: number; config: DBConfig };

export type Context = {
  db: IDBDatabase | null;
  triggerUpdate: () => void;
  transactionCount: number;
  keepLastReadResults?: boolean;
};

export const DBContext = React.createContext<Context | null>(null);
DBContext.displayName = 'ReactiveDBContext';

const IndexedDBProvider: React.FC<Props> = (props) => {
  const { name, version, config } = props;
  const [db, setDB] = useState<IDBDatabase | null>(null);
  const [transactionCount, setTransactionCount] = useState(0);

  const triggerUpdate = useCallback(() => {
    console.log('update triggerred');
    setTransactionCount((prevState) => ++prevState);
  }, [setTransactionCount]);

  const contextValue = useMemo(
    () => ({
      db,
      triggerUpdate,
      transactionCount,
      keepLastReadResults: config.keepLastReadResults,
    }),
    [triggerUpdate, db, transactionCount, config],
  );

  useEffect(() => {
    openDB(name || 'ReactiveDB', version || 1, config)
      .then((result) => {
        setDB(result);
      })
      .catch((error) => console.log(error));
  }, [name, version, config]);

  return <DBContext.Provider value={contextValue}>{props.children}</DBContext.Provider>;
};

export default IndexedDBProvider;
