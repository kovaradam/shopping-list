/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Item from '../../model/items';
import { useItems } from '../../store/items';
import Swipeable from '../Swipeable';

type Props = { isDisabled?: boolean } & Item;

const ListItem: React.FC<Props> = (props) => {
  const { name, id } = props;
  const [volume, setVolume] = useState('1');
  const [units, setUnits] = useState('x');
  const { updateItem } = useItems();

  const nameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (name === '' && nameInput.current) nameInput.current.focus();
  }, []);
  return (
    <Swipeable>
      <Wrapper>
        <NameInput
          tabIndex={id}
          ref={nameInput}
          value={name}
          disabled={props.isDisabled}
          onChange={(event): void => updateItem(event.target.value, id)}
        />
        <InputWrapper>
          <VolumeInput
            tabIndex={id}
            value={volume}
            disabled={props.isDisabled}
            onChange={(event): void => setVolume(event.target.value)}
          />
          <UnitsInput
            tabIndex={id}
            value={units}
            disabled={props.isDisabled}
            onChange={(event): void => setUnits(event.target.value)}
          />
        </InputWrapper>
      </Wrapper>
    </Swipeable>
  );
};

export default ListItem;

const Wrapper = styled.li`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  padding-top: 15px;
  font-size: 2rem;
  border-bottom: 1px solid #ffee03;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
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
