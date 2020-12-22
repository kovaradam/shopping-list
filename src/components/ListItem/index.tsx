import React, { useState } from 'react';
import styled from 'styled-components';

type Props = { name: string };

const ListItem: React.FC<Props> = ({ name }) => {
  const [volume, setVolume] = useState('5');
  const [units, setUnits] = useState('x');
  return (
    <Wrapper>
      <Title>{name}</Title>
      <InputWrapper>
        <VolumeInput value={volume} onChange={(event) => setVolume(event.target.value)} />
        <UnitsInput value={units} onChange={(event) => setUnits(event.target.value)} />
      </InputWrapper>
    </Wrapper>
  );
};

export default ListItem;

const Wrapper = styled.li`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  font-size: 2rem;
  border-bottom: 1px solid #ffee03;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-weight: 300;
  font-size: inherit;
  margin: 0;
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
