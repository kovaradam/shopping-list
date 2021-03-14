import React, { useCallback } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styled, { ThemedStyledFunction } from 'styled-components';
import BareList from '../../styles/BareList';
import SlideDown from '../SlideDown';
import SidenavButton from './SidenavButton';

type Props = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  Icon: React.FC;
};

const SidenavList: React.FC<Props> = ({
  isHidden,
  setIsHidden,
  title,
  Icon,
  children,
}) => {
  const toggleIsHidden = useCallback((): void => {
    setIsHidden((isHidden) => !isHidden);
  }, [setIsHidden]);

  return (
    <Wrapper isHidden={isHidden}>
      <Header>
        <SidenavButton Icon={Icon} onClick={toggleIsHidden}>
          {title}
          <ListButtonIconWrapper isHidden={isHidden}>
            <ListButtonIcon />
          </ListButtonIconWrapper>
        </SidenavButton>
      </Header>
      <SlideDown isHidden={isHidden}>
        <List>{children}</List>
      </SlideDown>
    </Wrapper>
  );
};

export default SidenavList;

const Wrapper = styled.div<{ isHidden: boolean }>`
  width: 100%;
  background-color: ${(props): string => (props.isHidden ? 'transparent' : '#80808012')};
  padding-bottom: 5px;
  position: relative;
`;

const Header = styled.div``;

const List = styled(BareList)``;

const ListButtonIconWrapper = styled.span<{ isHidden: boolean }>`
  justify-self: flex-end;
  transform: rotate(${(props): string => `${!props.isHidden && '18'}0deg`});
`;

const ListButtonIcon = styled(FiChevronDown)``;
