import React, { useRef } from 'react';
import styled from 'styled-components';
import Overlay from '../Overlay';
import { ChromePicker } from 'react-color';
import useStore from '../../store';
import useOnClickOutside from '../../hooks/on-click-outside';

const zIndex = 4;

type Props = {
  isHidden: boolean;
  toggleIsHidden: () => void;
};

const ColorPicker: React.FC<Props> = ({ isHidden, toggleIsHidden }) => {
  const { themeColor, setThemeColor } = useStore();
  const wrapperElement = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(wrapperElement, () => !isHidden && toggleIsHidden());

  return (
    <Overlay zIndex={zIndex - 1} isHidden={isHidden}>
      <Wrapper ref={wrapperElement}>
        <Title>Select theme color</Title>
        <ChromePicker
          color={themeColor}
          onChangeComplete={(color): void => setThemeColor(color.hex)}
        />
      </Wrapper>
    </Overlay>
  );
};

export default ColorPicker;

const Wrapper = styled.div`
  position: fixed;
  left: 50vw;
  top: 50vh;
  transform: translateX(-50%) translateY(-50%);
  background-color: white;
  z-index: ${zIndex};
  padding: 20px;
  border-radius: 5px;

  & .chrome-picker {
    box-shadow: none !important;
  }
`;

const Title = styled.h1`
  color: ${(props): string => props.theme.main};
  width: 100%;
  text-align: center;
  font-weight: 350;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;
