import React from 'react';
import styled from 'styled-components';
import useLayout from '../../store/layout';
import { FiChevronLeft } from 'react-icons/fi';

const SideNavbar: React.FC = () => {
  const { isSideNavbarHidden, toggleIsSidenavbar } = useLayout();
  return (
    <Wrapper isHidden={isSideNavbarHidden}>
      <Header onClick={toggleIsSidenavbar}>
        <HideIcon />
      </Header>
    </Wrapper>
  );
};

export default SideNavbar;

const Wrapper = styled.aside<{ isHidden: boolean }>`
  height: 100%;
  position: absolute;
  width: 80vw;
  background-color: #fbf6f6;
  z-index: 1;
  transform: translateX(${(props): string => (props.isHidden ? '-105%' : '0%')});
  transition: transform 170ms ease-in;
  box-shadow: 0px 0px 15px -1px rgb(0 0 0 / 49%);
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
`;
