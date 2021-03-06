import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import useOnClickOutside from '../../hooks/on-click-outside';

type Props = { hide: () => void; isHideOnClick?: boolean };

const DropDownMenu: React.FC<Props> = (props) => {
  const { hide, children } = props;
  const wrapperElement = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperElement, hide);
  return (
    <Wrapper
      onClick={(): void => {
        if (props.isHideOnClick) {
          hide();
        }
      }}
      ref={wrapperElement}
    >
      {children}
    </Wrapper>
  );
};

export default DropDownMenu;

const animation = keyframes`
  from{
    transform: scaleX(0) scaleY(0)
  }
  to{
    transform: scaleX(1) scaleY(1)
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 25px;
  padding: 5px;
  left: auto;
  right: 25px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  width: 68%;
  box-sizing: border-box;
  z-index: 1;
  box-shadow: 0 0 5px 0 #a59e9e40;
  transform-origin: top right;
  animation: ${animation} 100ms forwards;
`;
