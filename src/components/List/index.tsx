import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import useStore from '../../store';
import { useItems } from '../../store/items';
import BareList from '../../styles/BareList';
import ListItem from './ListItem';

const List: React.FC = () => {
  const { items } = useItems();
  const { isShowDiscardedItems } = useStore();

  const containerElement = useRef<HTMLUListElement>(null);
  const preventDocumentScroll = useCallback((event: TouchEvent): void => {
    if (event.cancelable) {
      event.preventDefault();
    }
  }, []);

  const handleItemSwipeStart = useCallback(() => {
    containerElement.current?.addEventListener('touchmove', preventDocumentScroll);
  }, [containerElement, preventDocumentScroll]);

  const handleItemSwipeEnd = useCallback(() => {
    containerElement.current?.removeEventListener('touchmove', preventDocumentScroll);
  }, [containerElement, preventDocumentScroll]);

  return (
    <UList ref={containerElement}>
      {items
        .filter(({ isDiscarded }) => !isDiscarded)
        .map((item) => (
          <ListItem
            onSwipeStart={handleItemSwipeStart}
            onSwipeEnd={handleItemSwipeEnd}
            {...item}
            key={item.id}
          />
        ))}
      {isShowDiscardedItems &&
        items
          .filter(({ isDiscarded }) => isDiscarded)
          .map((item) => (
            <ListItem
              onSwipeStart={handleItemSwipeStart}
              onSwipeEnd={handleItemSwipeEnd}
              {...item}
              key={`${item.id}_discarded`}
            />
          ))}
    </UList>
  );
};

export default List;

const UList = styled(BareList)`
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - var(--header-height));
`;
