import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import styled from 'styled-components';
import { DBList, newListNamePlaceholder } from '../../model/list';
import { useLists } from '../../store/items';
import BareButton from '../../styles/BareButton';
import DropDownMenu from '../DropDownMenu';

type Props = { list: DBList };

const SidenavListItem: React.FC<Props> = ({ list }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameActive, setIsRenameActive] = useState(false);
  const { addListToCurrent, updateList, deleteList } = useLists();

  const hideListMenu = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);

  const nameInputElement = useRef<HTMLInputElement>(null);

  const renameList = useCallback(() => {
    const newName = nameInputElement.current?.value || '';

    if (newName === '') {
      setIsRenameActive(false);
      return;
    }
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
    if (isRenameActive) nameInputElement.current?.focus();
  }, [isRenameActive]);

  useEffect(() => {
    if (list.name === newListNamePlaceholder) setIsRenameActive(true);
  }, [list]);

  return (
    <Wrapper>
      <ListNameForm isHidden={!isRenameActive} onSubmit={submitRenameForm}>
        <ListNameInput ref={nameInputElement} onBlur={renameList} />
      </ListNameForm>
      {!isRenameActive && (
        <>
          <ItemButton onClick={(): void => addListToCurrent(list)}>
            {list.name}
          </ItemButton>
          <ItemMenuButton onClick={(): void => setIsMenuOpen(true)}>
            <ItemMenuIcon />
          </ItemMenuButton>
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
    </Wrapper>
  );
};

export default SidenavListItem;

const Wrapper = styled.li`
  position: relative;
  padding: 0;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 50px;
`;

const ItemButton = styled(BareButton)`
  font-size: inherit;
  padding: 0 18px;
  color: var(--sidenav-color);
  width: 75%;
  text-align: left;
`;

const ItemMenuButton = styled(ItemButton)`
  width: 25%;
  color: #b8b7b7;
  text-align: center;
  padding-left: 15px;
`;

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
