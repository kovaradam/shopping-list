import { useCallback } from 'react';
import useStore, { Store, ItemsStore } from '.';
import Item from '../model/item';

const itemsSelector = (state: Store): ItemsStore => {
  return {
    items: state.items,
    _lastItemId: state._lastItemId,
    addItem: state.addItem,
    updateItem: state.updateItem,
    removeItem: state.removeItem,
    setItems: state.setItems,
  };
};

interface UseItemsReturnType extends ItemsStore {
  deleteCurrentList: () => void;
}

export const useItems = (): UseItemsReturnType => {
  const setItems = useStore((state) => state.setItems);
  const deleteCurrentList = useCallback(() => setItems([]), [setItems]);
  return { ...useStore(itemsSelector), deleteCurrentList };
};

export const createItem = (name: string, state: Store): Item => {
  return { name, id: state._lastItemId + 1 };
};
