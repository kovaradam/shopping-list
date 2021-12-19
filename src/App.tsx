import { open } from 'indexeddb-hooked';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import List from './components/List';
import Sidenav from './components/Sidenav';
import { DBConfig, DEV } from './config';

open(DBConfig);

const App: React.FC = () => {
  useEffect(() => {
    if (DEV) {
      return;
    }

    const { location } = window;
    if (location.protocol !== 'https:') {
      location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
  }, []);

  return (
    <Wrapper>
      <Header />
      <Sidenav />
      <List />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
