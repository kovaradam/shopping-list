import React from 'react';
import styled from 'styled-components';
import { useItems } from '../../store/items';
import BareList from '../../styles/BareList';
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

const Wrapper = styled(BareList)`
  padding-top: var(--header-height);
  width: 100vw;
  overflow: hidden;
`;
