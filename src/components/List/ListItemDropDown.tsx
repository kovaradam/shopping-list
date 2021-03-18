import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { compareTwoStrings } from 'string-similarity';
import { read, update } from '../../db';
import { StoreNames } from '../../config';
import BareList from '../../styles/BareList';
import BareButton from '../../styles/BareButton';
import { FiX } from 'react-icons/all';

type Props = { value: string; setValue: (value: string) => void };

const ListItemDropDown: React.FC<Props> = ({ value, setValue }) => {
  const [names, setNames] = useState<string[]>([]);
  useEffect(() => {
    async function updateNames(): Promise<void> {
      const DBNames = await read<string[]>(StoreNames.ITEM_NAMES);
      setNames(DBNames.filter((name) => compareTwoStrings(name, value) > 0.3));
    }
    updateNames();
  }, [value]);

  const deleteName = (inputName: string): void => {
    update(StoreNames.ITEM_NAMES, { value: null, key: inputName });
    setNames((names): string[] => names.filter((name) => name !== inputName));
  };

  if (!names.length) return null;

  return (
    <Wrapper>
      <List>
        {names.map((name) => (
          <NameItem key={name}>
            <SelectButton onClick={(): void => setValue(name)}>{name}</SelectButton>
            <DeleteButton onClick={(): void => deleteName(name)}>
              <DeleteIcon />
            </DeleteButton>
          </NameItem>
        ))}
      </List>
    </Wrapper>
  );
};

export default ListItemDropDown;

const Wrapper = styled.div`
  position: relative;
`;

const List = styled(BareList)`
  position: absolute;
  width: 100%;
  left: 0;
  background-color: white;
  z-index: 1;
  margin-top: -2px;
  border-radius: 0 0 5px 5px;
  padding-bottom: 6px;
  box-shadow: 0 8px 8px 0px #80808038;
`;

const NameItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const Button = styled(BareButton)`
  padding: 15px 24px;
  box-sizing: border-box;
`;

const SelectButton = styled(Button)`
  min-width: 70%;
  font-size: 1.1rem;
  text-align: left;
  font-weight: 600;
`;

const DeleteButton = styled(Button)`
  text-align: right;
`;

const DeleteIcon = styled(FiX)`
  font-size: 1.15rem;
  color: grey;
`;
