import React, { useEffect } from 'react';
import { openDB, DBConfig } from './init';

type Props = { name?: string; version?: number; config: DBConfig };

let db: IDBDatabase;

const IndexedDBProvider: React.FC<Props> = (props) => {
  const { name, version, config } = props;

  useEffect(() => {
    openDB(name || 'ReactiveDB', version || 1, config)
      ?.then((result) => {
        db = result;
        console.log(db.name);
      })
      .catch((error) => console.log(error));
  }, [name, version, config]);

  return <>{props.children}</>;
};

export default IndexedDBProvider;
