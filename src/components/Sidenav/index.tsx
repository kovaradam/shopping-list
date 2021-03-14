import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import useLayout from '../../store/layout';
import { FiChevronLeft, FiDelete, FiFolderPlus } from 'react-icons/fi';
import useOnClickOutside from '../../hooks/on-click-outside';
import Overlay from '../Overlay';
import SidenavButton from './SidenavButton';
import { useItems, useLists } from '../../store/items';
import Lists from './Lists';
import Settings from './Settings';
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
          Lists
          <HideIcon />
        </Header>
        <ContentWrapper>
          <SidenavButton Icon={SaveIcon} onClick={saveCurrentList}>
            Save list
          </SidenavButton>
          <SidenavButton Icon={ClearIcon} onClick={deleteCurrentList}>
            Delete items
          </SidenavButton>
          <Lists isHidden={isListHidden} setIsHidden={setIsListHiddden} />
          <Settings />
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default Sidenav;

const Wrapper = styled.aside<{ isHidden: boolean }>`
  height: 100%;
  position: fixed;
  top: 0;
  width: 65vw;
  background-color: white;
  z-index: 3;
  transform: translateX(${(props): string => (props.isHidden ? '-105%' : '0%')});
  transition: transform 170ms ease-in;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props): string => (!props.isHidden ? '0 0 47px 0px #00000061' : '')};
`;

const Header = styled.header`
  height: var(--header-height);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  padding-right: 10px;
  box-sizing: border-box;
  font-size: var(--header-font-size);
  color: ${(props): string => props.theme.main};
  letter-spacing: var(--header-letter-spacing);
`;

const HideIcon = styled(FiChevronLeft)`
  font-size: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: min-content;
  padding-top: 13px;
`;

const SaveIcon = styled(FiFolderPlus)``;
const ClearIcon = styled(FiDelete)``;
