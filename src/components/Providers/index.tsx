import React from 'react';
import { IconContext } from 'react-icons/lib';
import { ThemeProvider } from 'styled-components';
import useStore from '../../store';

const Providers: React.FC = ({ children }) => {
  const { themeColor } = useStore();
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <ThemeProvider theme={{ main: themeColor }}>{children}</ThemeProvider>
    </IconContext.Provider>
  );
};

export default Providers;
