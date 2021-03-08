import { useContext } from 'react';
import { Context, DBContext } from '../Provider';

function useDB(): Context {
  const value = useContext(DBContext);
  if (!value) {
    throw new Error('IndexedDB hooks must be used within an IndexedDBProvider');
  }

  return value;
}

export default useDB;
