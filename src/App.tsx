import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import List from './components/List';
import SideNavbar from './components/SideNavbar';

const App: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <SideNavbar />
      <List />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
