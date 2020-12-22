import React from 'react';
import styled from 'styled-components';
import { items } from '../../store';
import ListItem from '../ListItem';

const List: React.FC = () => {
  return (
    <Wrapper>
      {items.map((name) => (
        <ListItem name={name} />
      ))}
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
