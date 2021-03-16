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
  const { id, name, isDiscarded, isPlaceholder } = props;
  const isNewItem = name === newItemNamePlaceholder;
  const [volume, setVolume] = useState(isNewItem ? 1 : props.volume || NaN);
  const [units, setUnits] = useState(isNewItem ? 'x' : props.units || '');
  const { updateItem, deleteItem } = useItems();
  const nameInputElement = useRef<HTMLInputElement>(null);

  const handleSwipeLeft = useCallback((): void => {
    deleteItem(id, !!isDiscarded);
  }, [id, deleteItem, isDiscarded]);

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

  if (isPlaceholder) {
    return <HideItemPlaceholder />;
  }

  return (
    <Swipeable
      onSwipeLeft={handleSwipeLeft}
      onSwipeStart={props.onSwipeStart}
      onSwipeEnd={props.onSwipeEnd}
    >
      <Container>
        <ItemWrapper isDiscarded={isDiscarded}>
          <ListItemInput
            onSubmit={handleFormSubmit}
            tabIndex={id}
            inputRef={nameInputElement}
            onBlur={handleUpdate}
            as={NameInput}
            disabled={isDiscarded}
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
              disabled={isDiscarded}
            />
            <ListItemInput
              onSubmit={handleFormSubmit}
              tabIndex={id}
              value={units}
              onChange={(event): void => setUnits(event.target.value)}
              onBlur={handleUpdate}
              type=""
              as={UnitsInput}
              disabled={isDiscarded}
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

const ItemWrapper = styled.div<{ isDiscarded?: boolean }>`
  width: 100%;
  padding: 9px 14px;
  padding-bottom: 4px;
  box-sizing: border-box;
  border-bottom: 0.3px solid
    ${(props): string => (props.isDiscarded ? 'white' : props.theme.main)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${itemHeight};
  background-color: ${(props): string => (props.isDiscarded ? '#80808012' : 'white')};
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
    background-color: var(--list-item-action-color);
  }
`;

const VolumeInput = styled(Input)`
  text-align: end;
  text-align: right;
  color: grey;
`;

const UnitsInput = styled(Input)`
  color: grey;
  width: 1.5rem;
`;

const NameInput = styled(Input)<{ isDiscarded?: boolean }>`
  font-weight: 300;
  font-size: 1.2rem;
  width: 50vw;
  height: auto;
  box-sizing: border-box;
  text-decoration: ${(props): string =>
    props.isDiscarded ? 'line-through 2px solid grey' : 'unset'};
`;

const hideItem = keyframes`
  from {
    height: ${itemHeight};
  }
  to{
    height:0;
  }
`;

const HideItemPlaceholder = styled.div`
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
