import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import styled from 'styled-components';
import useOnClickOutside from '../../hooks/on-click-outside';
import DBList from '../../model/list';
import { useLists } from '../../store/items';
import BareButton from '../../styles/BareButton';
import DropDownMenu from '../DropDownMenu';

type Props = { list: DBList };

const SidenavListItem: React.FC<Props> = ({ list }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameActive, setIsRenameActive] = useState(false);
  const { addListToCurrent, deleteList: _deleteList } = useLists();

  const hideListMenu = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);
  const deleteList = useCallback(() => _deleteList(list.id), [list, _deleteList]);

  const nameInputElement = useRef<HTMLInputElement>(null);
  useOnClickOutside(nameInputElement, () => setIsRenameActive(false));

  const renameList = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newName = (event.currentTarget.firstChild as HTMLInputElement)?.value;
      if (newName === '') {
        setIsRenameActive(false);
        return;
      }
      // todo rename list
      setIsRenameActive(false);
    },
    [setIsRenameActive],
  );

  useEffect(() => {
    if (isRenameActive) nameInputElement.current?.focus();
  }, [isRenameActive]);

  return (
    <Wrapper>
      <ListNameForm onSubmit={renameList} isHidden={!isRenameActive}>
        <ListNameInput ref={nameInputElement} />
      </ListNameForm>
      {!isRenameActive && (
        <>
          <ItemButton onClick={(): void => addListToCurrent(list)}>
            {list.name}
          </ItemButton>
          <ItemMenuButton>
            <ItemMenuIcon onClick={(): void => setIsMenuOpen(true)} />
          </ItemMenuButton>
        </>
      )}
      {isMenuOpen && (
        <DropDownMenu hide={hideListMenu}>
          <ListMenuButton onClick={(): void => setIsRenameActive(true)}>
            Rename
          </ListMenuButton>
          <ListMenuButton onClick={deleteList}>Delete</ListMenuButton>
        </DropDownMenu>
      )}
    </Wrapper>
  );
};

export default SidenavListItem;

const Wrapper = styled.li`
  position: relative;
  padding: 0 4px;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 50px;
`;

const ItemButton = styled(BareButton)`
  font-size: inherit;
  padding: 0 15px;
  color: var(--sidenav-color);
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
  width: 100%;
`;

const ItemMenuButton = styled(ItemButton)`
  color: #b8b7b7;
`;

const ItemMenuIcon = styled(FiMoreVertical)``;

const ListMenuButton = styled(BareButton)`
  display: flex;
  color: var(--sidenav-color);
  font-size: 0.9rem;
  width: 100%;
  padding: 7px 0;
`;
