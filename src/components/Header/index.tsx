import React from 'react';
import styled from 'styled-components';
import BareButton from '../../styles/BareButton';
import { BiPlus } from 'react-icons/bi';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useItems } from '../../store/items';
import useLayout from '../../store/layout';
import { newItemNamePlaceholder } from '../../model/item';

const Header: React.FC = () => {
  const { addItem } = useItems();
  const { toggleIsSidenavHidden, isSidenavHidden } = useLayout();

  return (
    <Wrapper>
      <Button
        onClick={(): void => {
          isSidenavHidden && toggleIsSidenavHidden();
        }}
      >
        <MenuIcon />
      </Button>
      <Title>notes</Title>
      <Button onClick={(): void => addItem(newItemNamePlaceholder)}>
        <AddItemIcon />
      </Button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  background-color: black;
  width: 100vw;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  z-index: 3;
`;

const Title = styled.h1`
  flex-grow: 1;
  text-align: center;
  text-justify: center;
  color: inherit;
  font-weight: 200;
  font-size: var(--header-font-size);
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
