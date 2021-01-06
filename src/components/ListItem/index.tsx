import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Item from '../../model/item';
import { useItems } from '../../store/items';
import Swipeable from '../Swipeable';
import { BiTrash } from 'react-icons/bi';

type Props = { isDisabled?: boolean } & Item;

const ListItem: React.FC<Props> = (props) => {
  const { name, id } = props;
  const [volume, setVolume] = useState('1');
  const [units, setUnits] = useState('x');
  const { updateItem, removeItem } = useItems();
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (name === '' && nameInput.current) nameInput.current.focus();
  }, [name]);

  if (props.isDiscarded) {
    return <DeletePlaceholder />;
  }

  return (
    <Swipeable onSwipeLeft={(): void => removeItem(id)}>
      <Container>
        <ItemWrapper>
          <NameInput
            tabIndex={id}
            ref={nameInput}
            value={name}
            disabled={props.isDiscarded}
            onChange={(event): void => updateItem(event.target.value, id)}
          />
          <InputWrapper>
            <VolumeInput
              tabIndex={id}
              value={volume}
              disabled={props.isDiscarded}
              onChange={(event): void => setVolume(event.target.value)}
            />
            <UnitsInput
              tabIndex={id}
              value={units}
              disabled={props.isDiscarded}
              onChange={(event): void => setUnits(event.target.value)}
            />
          </InputWrapper>
        </ItemWrapper>
        <DiscardWrapper>
          <DiscardIcon />
        </DiscardWrapper>
      </Container>
    </Swipeable>
  );
};

export default ListItem;

const itemHeight = '4.5rem';

const Container = styled.li`
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  height: min-content;
`;

const ItemWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  font-size: 2rem;
  border-bottom: 1px solid #ffee03;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${itemHeight};
`;

const InputWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const ListItemInput = styled.input`
  width: 2rem;
  height: 1.5rem;
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  outline-color: #e59700;
  &:focus {
    background-color: #ffee0321;
  }
`;

const VolumeInput = styled(ListItemInput)`
  text-align: end;
`;

const UnitsInput = styled(ListItemInput)`
  color: grey;
  font-size: 1.3rem;
  width: 1.5rem;
`;

const NameInput = styled(ListItemInput)`
  font-weight: 300;
  font-size: 1.6rem;
  margin: 0;
  width: 50vw;
  height: auto;
  box-sizing: border-box;
`;

const hideItem = keyframes`
  from {
    height: ${itemHeight};
  }
  to{
    height:0;
  }
`;

const DeletePlaceholder = styled.div`
  animation: ${hideItem} forwards 200ms;
`;

const DiscardWrapper = styled.div`
  width: 50vw;
  background-color: #fc5c5c;
  margin-right: -100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DiscardIcon = styled(BiTrash)`
  color: white;
  font-size: 2rem;
`;
