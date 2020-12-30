import React from 'react';
import styled from 'styled-components';
import Swipeable from './components/Swipeable';
import Header from './components/Header';
import List from './components/List';

const App: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <List />
      <Swipeable />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
