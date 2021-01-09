import React from 'react';
import styled from 'styled-components';
import BareButton from '../../styles/BareButton';
import { FiFolderPlus, FiDelete, FiFolder } from 'react-icons/fi';

const SidenavItem: React.FC = () => {
  return (
    <Wrapper>
      <Button>
        <SaveIcon /> <span>Save list</span>
      </Button>
      <Button>
        <ClearIcon /> <span>Delete list</span>
      </Button>
      <Button>
        <ListsIcon /> <span>Lists</span>
      </Button>
    </Wrapper>
  );
};

export default SidenavItem;

const Wrapper = styled.div``;

const Button = styled(BareButton)`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 25px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  font-size: 1.3rem;
  color: darkslategray;
  text-align: start;
`;

const SaveIcon = styled(FiFolderPlus)``;
const ClearIcon = styled(FiDelete)``;
const ListsIcon = styled(FiFolder)``;
