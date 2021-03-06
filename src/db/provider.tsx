import React, { useEffect } from 'react';

type Props = { name?: string };

const IndexedDBProvider: React.FC<Props> = ({ name, children }) => {
  useEffect(() => {
    if (!window.indexedDB) {
      console.log(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.",
      );
      return;
    }
    const request = window.indexedDB.open(name || 'ReactiveDB');

    request.onsuccess = (): void => console.log('DB open success');
    request.onerror = (): void => console.log('DB open error');
  }, [name]);
  return <>{children}</>;
};

export default IndexedDBProvider;
