import React from 'react';
import styled, { StyledComponent } from 'styled-components';

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBlur: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tabIndex: number;
  value?: unknown;
  type?: string;
  pattern?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  as: StyledComponent<'input', Record<string, unknown>, Record<string, unknown>, never>;
};

const ListItemInput: React.FC<Props> = (props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <Input ref={props.inputRef} {...props} />
    </form>
  );
};

export default ListItemInput;

const Input = styled.input``;