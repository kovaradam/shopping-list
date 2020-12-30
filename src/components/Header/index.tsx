import React from 'react';
import styled from 'styled-components';
import BareButton from '../../styles/BareButton';
import { BiPlus } from 'react-icons/bi';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useItems } from '../../store/items';

const Header: React.FC = () => {
  const { addItem } = useItems();
  return (
    <Wrapper>
      <Button>
        <MenuIcon />
      </Button>
      <Title>Groceries</Title>
      <Button onClick={(): void => addItem('')}>
        <AddItemIcon />
      </Button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: fixed;
  background-color: black;
  width: 100vw;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Title = styled.h1`
  flex-grow: 1;
  text-align: center;
  text-justify: center;
  color: inherit;
  font-weight: 200;
  margin: 0;
  padding: 0;
`;

const Button = styled(BareButton)`
  color: inherit;
  width: 20vw;
  height: 100%;

  &:active {
    color: grey;
  }
`;

const AddItemIcon = styled(BiPlus)`
  font-size: 2rem;
`;

const MenuIcon = styled(BiMenuAltLeft)`
  font-size: 2rem;
`;
