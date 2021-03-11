import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import DBItem, { newItemNamePlaceholder } from '../../model/item';
import { useItems } from '../../store/items';
import Swipeable from '../Swipeable';
import { BiTrash } from 'react-icons/bi';
import ListItemInput from './ListItemInput';

type Props = {
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  onSwipeLeft?: () => void;
} & DBItem;

const ListItem: React.FC<Props> = (props) => {
  const { id, name } = props;
  const isNewItem = name === newItemNamePlaceholder;
  const [volume, setVolume] = useState(isNewItem ? 1 : props.volume || NaN);
  const [units, setUnits] = useState(isNewItem ? 'x' : props.units || '');
  const { updateItem, deleteItem } = useItems();
  const nameInputElement = useRef<HTMLInputElement>(null);

  const handleSwipeLeft = useCallback((): void => {
    deleteItem(id);
  }, [id, deleteItem]);

  useEffect(() => {
    const currentElement = nameInputElement.current;
    if (!currentElement) return;
    if (isNewItem && currentElement) {
      currentElement.value = '';
      currentElement.focus();
    } else {
      currentElement.value = name;
    }
  }, [name, isNewItem]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    ((event.target as HTMLFormElement)[0] as HTMLInputElement).blur();
  };

  const handleUpdate = useCallback(() => {
    const newName = nameInputElement.current?.value || '';
    updateItem({ name: newName, id, volume, units });
  }, [nameInputElement, id, volume, units, updateItem]);

  if (props.isDiscarded) {
    return <DeletePlaceholder />;
  }

  return (
    <Swipeable
      onSwipeLeft={handleSwipeLeft}
      onSwipeStart={props.onSwipeStart}
      onSwipeEnd={props.onSwipeEnd}
    >
      <Container>
        <ItemWrapper>
          <ListItemInput
            onSubmit={handleFormSubmit}
            tabIndex={id}
            inputRef={nameInputElement}
            onBlur={handleUpdate}
            as={NameInput}
          />
          <InputWrapper>
            <ListItemInput
              onSubmit={handleFormSubmit}
              tabIndex={id}
              value={isNaN(volume) ? '' : volume}
              onChange={(event): void => setVolume(parseInt(event.target.value))}
              type="decimal"
              pattern="[0-9]*"
              onBlur={handleUpdate}
              as={VolumeInput}
            />
            <ListItemInput
              onSubmit={handleFormSubmit}
              tabIndex={id}
              value={units}
              onChange={(event): void => setUnits(event.target.value)}
              onBlur={handleUpdate}
              type=""
              as={UnitsInput}
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

const itemHeight = '4rem';

const Container = styled.li`
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  height: min-content;
`;

const ItemWrapper = styled.div`
  width: 100%;
  padding: 9px 14px;
  padding-bottom: 4px;
  box-sizing: border-box;
  border-bottom: 1px solid #faf5ac;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${itemHeight};
  background-color: white;
`;

const InputWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 2rem;
  height: 1.5rem;
  font-size: 1.1rem;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  margin: 1px;
  &:focus {
    background-color: #ffee0321;
  }
`;

const VolumeInput = styled(Input)`
  text-align: end;
  color: grey;
`;

const UnitsInput = styled(Input)`
  color: grey;
  width: 1.5rem;
`;

const NameInput = styled(Input)`
  font-weight: 300;
  font-size: 1.2rem;
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
