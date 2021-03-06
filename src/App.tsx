import { open } from 'indexeddb-hooked';
import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import List from './components/List';
import Sidenav from './components/Sidenav';
import { DBConfig } from './config';

open(DBConfig);

const App: React.FC = () => {
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
