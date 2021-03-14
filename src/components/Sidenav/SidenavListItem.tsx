import React from 'react';
import styled from 'styled-components';
import BareButton from '../../styles/BareButton';

const SidenavListItem: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
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

export const ItemMainButton = styled(BareButton)`
  font-size: inherit;
  padding: 0 18px;
  color: var(--sidenav-color);
  width: 75%;
  text-align: left;
`;

export const ItemActionButton = styled(ItemMainButton)`
  width: 25%;
  color: #b8b7b7;
  text-align: center;
  padding-left: 15px;
`;
