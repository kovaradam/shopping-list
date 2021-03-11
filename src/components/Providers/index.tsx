import React from 'react';
import { IconContext } from 'react-icons/lib';
import { DBConfig } from '../../config';
import IndexedDBProvider from '../../db/provider';

const Providers: React.FC = ({ children }) => {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <IndexedDBProvider config={DBConfig} version={2}>
        {children}
      </IndexedDBProvider>
    </IconContext.Provider>
  );
};

export default Providers;
