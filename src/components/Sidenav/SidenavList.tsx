import React, { useCallback } from 'react';
import { FiFolder, FiChevronDown } from 'react-icons/fi';
import styled from 'styled-components';
import useRead from '../../db/hooks/use-read';
import BareList from '../../styles/BareList';
import SlideDown from '../SlideDown';
import SidenavButton from './SidenavButton';
import SidenavListItem from './SidenavListItem';
import { DBList } from '../../model/list';

type Props = {
  isHidden: boolean;
  setIsHiddden: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidenavList: React.FC<Props> = ({ isHidden, setIsHiddden }) => {
  const lists = useRead<DBList>('lists');

  const toggleIsHidden = useCallback((): void => {
    setIsHiddden((isHidden) => !isHidden);
  }, [setIsHiddden]);

  return (
    <Wrapper isHidden={isHidden}>
      {!isHidden && <Marker />}
      <Header>
        <SidenavButton Icon={ListsIcon} onClick={toggleIsHidden}>
          Lists
          <ListButtonIconWrapper isHidden={isHidden}>
            <ListButtonIcon />
          </ListButtonIconWrapper>
        </SidenavButton>
      </Header>
      <SlideDown isHidden={isHidden}>
        <List>
          {lists?.map((list) => (
            <SidenavListItem list={list} key={list.id} />
          ))}
        </List>
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

const Marker = styled.div`
  background-color: var(--sidenav-action-color);
  width: 7px;
  height: 100%;
  position: absolute;
`;

const List = styled(BareList)``;

const ListButtonIconWrapper = styled.span<{ isHidden: boolean }>`
  justify-self: flex-end;
  transform: rotate(${(props): string => `${!props.isHidden && '18'}0deg`});
`;

const ListButtonIcon = styled(FiChevronDown)``;
const ListsIcon = styled(FiFolder)``;
