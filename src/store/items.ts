import { useCallback } from 'react';
import useStore, { Store, ItemsStore } from '.';
import Item from '../model/item';
import DBList from '../model/list';

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
  const [setItems] = useStore((state) => [state.setItems]);
  const deleteCurrentList = useCallback(() => setItems([]), [setItems]);
  return { ...useStore(itemsSelector), deleteCurrentList };
};

type UseListsReturnType = {
  addListToCurrent: (list: DBList) => void;
};
export const useLists = (): UseListsReturnType => {
  const addItem = useStore((state) => state.addItem);
  const addListToCurrent = useCallback(
    (list: DBList) => list.items.forEach((item) => addItem(item.name)),
    [addItem],
  );
  return { addListToCurrent };
};

export const createItem = (name: string, state: Store): Item => {
  return { name, id: state._lastItemId + 1 };
};
