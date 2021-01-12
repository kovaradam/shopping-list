import React from 'react';
import styled from 'styled-components';

type Props = { isHidden: boolean; duration?: string };

const SlideDown: React.FC<Props> = ({ isHidden, duration, children }) => {
  return (
    <Wrapper isHidden={isHidden} duration={duration || defaultDuration}>
      {children}
    </Wrapper>
  );
};

export default SlideDown;

const defaultDuration = '170ms';

const Wrapper = styled.div<{ isHidden: boolean; duration: string }>`
  max-height: ${(props): string => (props.isHidden ? '0' : '100px')};
  /* transition: all ${(props): string => props.duration} linear; */
  overflow: hidden;
`;
