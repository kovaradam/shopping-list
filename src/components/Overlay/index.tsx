import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = { duration?: string };

const Overlay: React.FC<Props> = (props) => {
  return <Wrapper {...props}></Wrapper>;
};

export default Overlay;

const defaultDuration = '170ms';

const overlayFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
`;

const Wrapper = styled.div<{ duration?: string }>`
  background-color: grey;
  transition: opacity 170ms ease-in;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  animation: ${overlayFadeIn}
    ${(props): string => (props.duration ? props.duration : defaultDuration)} forwards;
`;
