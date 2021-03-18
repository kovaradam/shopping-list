import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { compareTwoStrings } from 'string-similarity';
import { read } from '../../db';
import { StoreNames } from '../../config';
import BareList from '../../styles/BareList';
import BareButton from '../../styles/BareButton';

type Props = { value: string; setValue: (value: string) => void };

const ListItemDropDown: React.FC<Props> = ({ value, setValue }) => {
  const [names, setNames] = useState<string[]>([]);
  useEffect(() => {
    async function updateNames(): Promise<void> {
      //   const DBNames = await read<string[]>(StoreNames.ITEM_NAMES);
      //   setNames(DBNames.filter((name) => compareTwoStrings(name, value) > 0.3));
      setNames(['name1', 'name2']);
    }
    updateNames();
  }, [value]);

  if (!names) return null;

  return (
    <Wrapper>
      <List>
        {names.map((name) => (
          <NameItem key={name}>
            <Button onClick={(): void => setValue(name)}>{name}</Button>
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
  margin-top: -10px;
  border-radius: 0 0 5px 5px;
  padding-bottom: 6px;
  box-shadow: 0 8px 8px 0px #80808038;
`;

const NameItem = styled.li``;

const Button = styled(BareButton)`
  padding: 10px 17px;
  box-sizing: border-box;
  width: 100%;
  font-size: 1.1rem;
  text-align: left;
  font-weight: 600;
`;
