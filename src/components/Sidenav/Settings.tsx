import React, { useState, useCallback } from 'react';
import SidenavListItem, { ItemMainButton } from './SidenavListItem';
import { FiSettings, FiToggleLeft } from 'react-icons/fi';
import { BiColorFill } from 'react-icons/bi';
import styled from 'styled-components';
import SidenavList from './SidenavList';
import useLayout from '../../store/layout';
import ColorPicker from '../ColorPicker';

const Settings: React.FC = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isColorPickerHidden, setIsColorPickerHidden] = useState(true);
  const { isShowDiscardedItems, toggleIsShowDiscardedItems } = useLayout();

  const toggleIsColorPickerHidden = useCallback(
    () => setIsColorPickerHidden((prevState) => !prevState),
    [],
  );

  return (
    <>
      <SidenavList
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        title="Settings"
        Icon={SettingsIcon}
      >
        <SidenavListItem>
          <ItemButton onClick={toggleIsShowDiscardedItems}>
            Show discarded items
            <DiscardedIcon selected={isShowDiscardedItems} />
          </ItemButton>
        </SidenavListItem>
        <SidenavListItem>
          <ItemButton onClick={toggleIsColorPickerHidden}>
            Change theme color
            <ColorPickerIcon />
          </ItemButton>
        </SidenavListItem>
      </SidenavList>
      <ColorPicker
        isHidden={isColorPickerHidden}
        toggleIsHidden={toggleIsColorPickerHidden}
      />
    </>
  );
};

export default Settings;

const SettingsIcon = styled(FiSettings)``;

const DiscardedIcon = styled(FiToggleLeft)<{ selected: boolean }>`
  transform: scaleX(${(props): number => (props.selected ? -1 : 1)});
  font-size: 1.2rem;
`;

const ColorPickerIcon = styled(BiColorFill)`
  font-size: 1.2rem;
`;

const ItemButton = styled(ItemMainButton)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
