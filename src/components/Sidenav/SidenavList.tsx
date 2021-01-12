import React, { useState } from 'react';
import { FiFolder } from 'react-icons/fi';
import styled from 'styled-components';
import BareList from '../../styles/BareList';
import SlideDown from '../SlideDown';
import SidenavButton from './SidenavButton';

const SidenavList: React.FC = () => {
  const [isHidden, setIsHiddden] = useState(true);

  return (
    <Wrapper isHidden={isHidden}>
      <Header>
        {!isHidden && <Marker />}
        <SidenavButton
          Icon={ListsIcon}
          onClick={(): void => setIsHiddden((isHidden) => !isHidden)}
        >
          Lists
        </SidenavButton>
      </Header>
      <SlideDown isHidden={isHidden}>
        <List>
          <ListItem>Curry chicken</ListItem>
          <ListItem>Eggies and bacon</ListItem>
        </List>
      </SlideDown>
    </Wrapper>
  );
};

export default SidenavList;

const Wrapper = styled.div<{ isHidden: boolean }>`
  width: 100%;
  background-color: ${(props): string => (props.isHidden ? 'transparent' : '#80808012')};
  padding-bottom: 10px;
`;

const Header = styled.div`
  position: relative;
`;

const Marker = styled.div`
  background-color: #ffff0038;
  width: 7px;
  height: 100%;
  position: absolute;
`;

const List = styled(BareList)``;

const ListItem = styled.li`
  padding: 15px 25px;
  font-size: 0.9rem;
`;

const ListsIcon = styled(FiFolder)``;
