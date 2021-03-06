import React from 'react';
import { IconContext } from 'react-icons/lib';
import IndexedDBProvider from '../../db/provider';

const Providers: React.FC = ({ children }) => {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <IndexedDBProvider>{children}</IndexedDBProvider>
    </IconContext.Provider>
  );
};

export default Providers;
