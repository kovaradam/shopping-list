import React, { useEffect } from 'react';
import { openDB, DBConfig } from './init';

type Props = { name?: string; version?: number; config: DBConfig };

let db: IDBDatabase;

const IndexedDBProvider: React.FC<Props> = (props) => {
  const { name, version, config } = props;

  useEffect(() => {
    openDB(config, name, version)
      ?.then((result) => {
        db = result;
        console.log(db);
      })
      .catch((err) => console.log(err));
  }, [name, version, config]);

  return <>{props.children}</>;
};

export default IndexedDBProvider;
