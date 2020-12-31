import React from 'react';
import styled from 'styled-components';

type Props = { childrenHeight: string };

const Collapsible: React.FC<Props> = ({ children, childrenHeight }) => {
  return (
    <Wrapper isEmpty={children !== null} height={childrenHeight}>
      {children}
    </Wrapper>
  );
};

export default Collapsible;

const Wrapper = styled.div<{ isEmpty: boolean; height: string }>`
  height: ${(props): string => (props.isEmpty ? props.height : '0')};
  transition: height 200ms;
`;
