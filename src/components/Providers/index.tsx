import React from 'react';
import { IconContext } from 'react-icons/lib';
import { ThemeProvider } from 'styled-components';
import { DBConfig } from '../../config';
import IndexedDBProvider from '../../db/provider';
import useStore from '../../store';

const Providers: React.FC = ({ children }) => {
  const { themeColor } = useStore();
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <ThemeProvider theme={{ main: themeColor }}>
        <IndexedDBProvider config={DBConfig}>{children}</IndexedDBProvider>
      </ThemeProvider>
    </IconContext.Provider>
  );
};

export default Providers;
