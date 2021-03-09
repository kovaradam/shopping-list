import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import useLayout from '../../store/layout';
import { FiChevronLeft, FiDelete, FiFolderPlus } from 'react-icons/fi';
import useOnClickOutside from '../../hooks/on-click-outside';
import Overlay from '../Overlay';
import SidenavButton from './SidenavButton';
import { useItems, useLists } from '../../store/items';
import SidenavList from './SidenavList';
import { newListNamePlaceholder } from '../../model/list';

const Sidenav: React.FC = () => {
  const { isSidenavHidden, toggleIsSidenavHidden } = useLayout();
  const [isListHidden, setIsListHiddden] = useState(true);
  const { deleteCurrentList, items } = useItems();
  const { updateList } = useLists();
  const ref = useRef(null);
  const hide = useCallback(() => !isSidenavHidden && toggleIsSidenavHidden(), [
    isSidenavHidden,
    toggleIsSidenavHidden,
  ]);
  useOnClickOutside(ref, hide);

  const saveCurrentList = useCallback(() => {
    updateList({ name: newListNamePlaceholder, items });
    setIsListHiddden(false);
  }, [items, updateList]);

  return (
    <>
      <Overlay isHidden={isSidenavHidden} />
      <Wrapper ref={ref} isHidden={isSidenavHidden}>
        <Header onClick={hide}>
          <HideIcon />
        </Header>
        <ContentWrapper>
          <SidenavButton Icon={SaveIcon} onClick={saveCurrentList}>
            Save list
          </SidenavButton>
          <SidenavButton Icon={ClearIcon} onClick={deleteCurrentList}>
            Delete items
          </SidenavButton>
          <SidenavList isHidden={isListHidden} setIsHiddden={setIsListHiddden} />
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default Sidenav;

const Wrapper = styled.aside<{ isHidden: boolean }>`
  height: 100%;
  position: fixed;
  width: 65vw;
  background-color: white;
  z-index: 2;
  transform: translateX(${(props): string => (props.isHidden ? '-105%' : '0%')});
  transition: transform 170ms ease-in;
  box-shadow: 0px 0px 15px -1px rgb(0 0 0 / 49%);
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: var(--header-height);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 10px;
  box-sizing: border-box;
`;

const HideIcon = styled(FiChevronLeft)`
  font-size: 2rem;
  color: var(--sidenav-action-color);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: min-content;
`;

const SaveIcon = styled(FiFolderPlus)``;
const ClearIcon = styled(FiDelete)``;
