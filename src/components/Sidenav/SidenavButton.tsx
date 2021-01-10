import React from 'react';
import styled from 'styled-components';
import BareButton from '../../styles/BareButton';

type Props = { Icon: React.FC; onClick: () => void };

const SidenavButton: React.FC<Props> = ({ Icon, children, onClick }) => {
  return (
    <Button onClick={onClick}>
      <Icon />
      <span>{children}</span>
    </Button>
  );
};

export default SidenavButton;

const Button = styled(BareButton)`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 25px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  font-size: 1.3rem;
  color: var(--sidenav-color);
  text-align: start;
`;
