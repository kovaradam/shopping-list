import React from 'react';
import styled from 'styled-components';
import { useItems } from '../../store/items';
import ListItem from '../ListItem';

const List: React.FC = () => {
  const { items } = useItems();
  return (
    <Wrapper>
      {items.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-top: var(--header-height);
  width: 100vw;
  overflow: hidden;
`;
