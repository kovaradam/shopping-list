import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DBList, newListNamePlaceholder } from '../../model/list';
import { useItems, useLists } from '../../store/items';
import BareButton from '../../styles/BareButton';
import { FiFolder, FiMoreVertical } from 'react-icons/fi';
import styled from 'styled-components';
import { StoreNames } from '../../config';
import { useRead } from 'indexeddb-hooked';
import DropDownMenu from '../DropDownMenu';
import SidenavList from './SidenavList';
import SidenavListItem, { ItemMainButton, ItemActionButton } from './SidenavListItem';

type Props = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const Lists: React.FC<Props> = (props) => {
  const lists = useRead<DBList>(StoreNames.LISTS);

  return (
    <SidenavList {...props} title="Lists" Icon={ListsIcon}>
      {lists?.map((list) => (
        <ListItem list={list} key={list.id} />
      ))}
    </SidenavList>
  );
};

export default Lists;

type ListItemProps = { list: DBList };

const ListItem: React.FC<ListItemProps> = ({ list }) => {
  const isNewList = list.name === newListNamePlaceholder;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameActive, setIsRenameActive] = useState(isNewList);
  const { updateList, deleteList } = useLists();
  const { addItems } = useItems();

  const hideListMenu = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);

  const nameInputElement = useRef<HTMLInputElement>(null);

  const renameList = useCallback(() => {
    const newName = nameInputElement.current?.value || '';
    updateList({ ...list, name: newName });
    setIsRenameActive(false);
  }, [setIsRenameActive, list, updateList]);

  // weird workaround to handle ios safari keyboard done button
  const submitRenameForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      nameInputElement.current?.blur();
    },
    [nameInputElement],
  );

  useEffect(() => {
    if (isRenameActive) {
      const inputElement = nameInputElement.current;
      if (!inputElement) return;
      inputElement?.focus();
      if (isNewList) {
        list.name = '';
      }
      inputElement.value = list.name;
      inputElement.setSelectionRange(list.name.length, list.name.length);
    }
  }, [isRenameActive, list, isNewList]);

  return (
    <SidenavListItem>
      <ListNameForm isHidden={!isRenameActive} onSubmit={submitRenameForm}>
        <ListNameInput ref={nameInputElement} onBlur={renameList} />
      </ListNameForm>
      {!isRenameActive && (
        <>
          <ItemMainButton onClick={(): void => addItems(list.items)}>
            {list.name}
          </ItemMainButton>
          <ItemActionButton onClick={(): void => setIsMenuOpen(true)}>
            <ItemMenuIcon />
          </ItemActionButton>
        </>
      )}
      {isMenuOpen && (
        <DropDownMenu hide={hideListMenu} isHideOnClick>
          <ListMenuButton onClick={(): void => setIsRenameActive(true)}>
            Rename
          </ListMenuButton>
          <ListMenuButton onClick={(): void => deleteList(list.id)}>
            Delete
          </ListMenuButton>
        </DropDownMenu>
      )}
    </SidenavListItem>
  );
};

const ListNameForm = styled.form<{ isHidden: boolean }>`
  height: min-content;
  align-self: center;
  margin: 0 14px;
  width: 82%;
  box-sizing: border-box;
  display: ${(props): string => (props.isHidden ? 'none' : 'auto')};
`;

const ListNameInput = styled.input`
  border: none;
  height: 1.4rem;
  font-size: 1rem;
  width: 100%;
`;

const ItemMenuIcon = styled(FiMoreVertical)``;

const ListMenuButton = styled(BareButton)`
  display: flex;
  color: var(--sidenav-color);
  font-size: 0.9rem;
  width: 100%;
  padding: 7px 0;
`;

const ListsIcon = styled(FiFolder)``;
