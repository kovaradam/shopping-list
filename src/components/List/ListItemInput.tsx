import React, { useRef } from 'react';
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
  const inputElement = useRef<HTMLInputElement | null>(null);
  return (
    <form onSubmit={onSubmit}>
      <Input
        ref={props.inputRef || inputElement}
        {...props}
        onFocus={(): void =>
          placeCaretAtEnd(props.inputRef?.current || inputElement?.current)
        }
      />
    </form>
  );
};

export default ListItemInput;

// stolen from planner.now.sh
function placeCaretAtEnd(element: HTMLInputElement | null): void {
  if (!element) return;
  const position = element.value.length;
  element.focus();
  element.setSelectionRange(position, position);
}

const Input = styled.input``;
