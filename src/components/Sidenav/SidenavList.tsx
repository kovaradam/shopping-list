import React, { useState } from 'react';
import { FiFolder, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { initLists } from '../../model/list';
import { useLists } from '../../store/items';
import BareButton from '../../styles/BareButton';
import BareList from '../../styles/BareList';
import SlideDown from '../SlideDown';
import SidenavButton from './SidenavButton';

const SidenavList: React.FC = () => {
  const [isHidden, setIsHiddden] = useState(true);
  const { addListToCurrent } = useLists();
  return (
    <Wrapper isHidden={isHidden}>
      {!isHidden && <Marker />}
      <Header>
        <SidenavButton
          Icon={ListsIcon}
          onClick={(): void => setIsHiddden((isHidden) => !isHidden)}
        >
          Lists
        </SidenavButton>
      </Header>
      <SlideDown isHidden={isHidden}>
        <List>
          {initLists.map((list) => (
            <ListItem key={list.id}>
              <ItemButton onClick={(): void => addListToCurrent(list)}>
                {list.name}
              </ItemButton>
              <DeleteItemButton>
                <DeleteIcon />
              </DeleteItemButton>
            </ListItem>
          ))}
        </List>
      </SlideDown>
    </Wrapper>
  );
};

export default SidenavList;

const Wrapper = styled.div<{ isHidden: boolean }>`
  width: 100%;
  background-color: ${(props): string => (props.isHidden ? 'transparent' : '#80808012')};
  padding-bottom: 5px;
  position: relative;
`;

const Header = styled.div``;

const Marker = styled.div`
  background-color: var(--sidenav-action-color);
  width: 7px;
  height: 100%;
  position: absolute;
`;

const List = styled(BareList)``;

const ListItem = styled.li`
  padding-left: 10px;
  padding-right: 3px;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
`;

const ItemButton = styled(BareButton)`
  font-size: inherit;
  padding: 15px 15px;
  color: var(--sidenav-color);
`;

const DeleteItemButton = styled(ItemButton)`
  color: #b8b7b7;
`;

const DeleteIcon = styled(FiX)``;
const ListsIcon = styled(FiFolder)``;
