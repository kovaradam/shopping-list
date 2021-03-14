import React from 'react';
import styled from 'styled-components';

type Props = { isHidden: boolean; duration?: string; zIndex?: number };

const Overlay: React.FC<Props> = (props) => {
  return <Wrapper {...props}></Wrapper>;
};

export default Overlay;

const defaultDuration = '170ms';

const Wrapper = styled.div<Props>`
  background-color: #80808080;
  transition: opacity
    ${(props): string => (props.duration ? props.duration : defaultDuration)} ease-in;
  opacity: ${(props): number => +!props.isHidden * 1};
  pointer-events: ${(props): string => (props.isHidden ? 'none' : 'all')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: ${(props): number => props.zIndex || 2};
  top: 0;
`;
