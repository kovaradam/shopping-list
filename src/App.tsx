import React from 'react';
import styled from 'styled-components';
import List from './components/List';

const App: React.FC = () => {
  return (
    <Wrapper>
      <List />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-color: #ffc0cb4f; */
`;
