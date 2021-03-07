import React from 'react';
import { IconContext } from 'react-icons/lib';
import IndexedDBProvider from '../../db/Provider';
import useStore from '../../store';

const DBConfig = {
  objectStores: [
    {
      name: 'items',
      options: { keyPath: 'id' },
      indexes: [{ name: 'id', keyPath: 'id', options: { unique: true } }],
      data: useStore.getState().items,
    },
  ],
};

const Providers: React.FC = ({ children }) => {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <IndexedDBProvider config={DBConfig}>{children}</IndexedDBProvider>
    </IconContext.Provider>
  );
};

export default Providers;
