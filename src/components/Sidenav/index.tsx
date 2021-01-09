import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import useLayout from '../../store/layout';
import { FiChevronLeft } from 'react-icons/fi';
import useOnClickOutside from '../../hooks/on-click-outside';
import SidenavItem from './SidenavItem';

const Sidenav: React.FC = () => {
  const { isSidenavHidden, toggleIsSidenavHidden } = useLayout();
  const ref = useRef(null);
  const hide = useCallback(() => !isSidenavHidden && toggleIsSidenavHidden(), [
    isSidenavHidden,
    toggleIsSidenavHidden,
  ]);
  useOnClickOutside(ref, hide);
  return (
    <Wrapper ref={ref} isHidden={isSidenavHidden}>
      <Header onClick={hide}>
        <HideIcon />
      </Header>
      <ContentWrapper>
        <SidenavItem />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Sidenav;

const Wrapper = styled.aside<{ isHidden: boolean }>`
  height: 100%;
  position: absolute;
  width: 75vw;
  background-color: #fbf6f6;
  z-index: 1;
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
  color: antiquewhite;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: min-content;
`;
