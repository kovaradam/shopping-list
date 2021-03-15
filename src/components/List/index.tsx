import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useItems } from '../../store/items';
import BareList from '../../styles/BareList';
import ListItem from './ListItem';

const List: React.FC = () => {
  const { items } = useItems();

  const containerElement = useRef<HTMLUListElement>(null);
  const preventDocumentScroll = useCallback((event: TouchEvent): void => {
    if (event.cancelable) event.preventDefault();
  }, []);

  const handleItemSwipeStart = useCallback(() => {
    containerElement.current?.addEventListener('touchmove', preventDocumentScroll);
  }, [containerElement, preventDocumentScroll]);

  const handleItemSwipeEnd = useCallback(() => {
    containerElement.current?.removeEventListener('touchmove', preventDocumentScroll);
  }, [containerElement, preventDocumentScroll]);

  return (
    <UList ref={containerElement}>
      {items.map((item) => (
        <ListItem
          onSwipeStart={handleItemSwipeStart}
          onSwipeEnd={handleItemSwipeEnd}
          {...item}
          key={`${item.id}_${item.isDiscarded ? 'discarded' : ''}`}
        />
      ))}
    </UList>
  );
};

export default List;

const UList = styled(BareList)`
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - var(--header-height));
`;
