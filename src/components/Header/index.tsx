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
      <Title>Shopping list</Title>
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
  background-color: white;
  font-weight: 500;
  width: 100vw;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props): string => props.theme.main};
  z-index: 1;
  box-shadow: 0 0 14px 0 #80808033;
`;

const Title = styled.h1`
  flex-grow: 1;
  text-align: center;
  text-justify: center;
  color: inherit;
  font-weight: 400;
  font-size: var(--header-font-size);
  margin: 0;
  padding: 0;
  letter-spacing: var(--header-letter-spacing);
`;

const Button = styled(BareButton)`
  color: inherit;
  width: 20vw;
  height: 100%;
  font-weight: 500;

  &:active {
    color: grey;
  }
`;

const AddItemIcon = styled(BiPlus)`
  font-size: 2.4rem;
`;

const MenuIcon = styled(BiMenuAltLeft)`
  font-size: 2.4rem;
`;
