import { useCallback } from 'react';
import useStore, { Store, ItemsStore } from '.';
import useUpdate from '../db/hooks/use-update';
import { StoreNames } from '../config';
import DBItem, { DBItemInput } from '../model/item';
import { DBList, DBListInput } from '../model/list';
import useRead from '../db/hooks/use-read';

const itemsSelector = (state: Store): ItemsStore => {
  return {
    items: state.items,
    _lastItemId: state._lastItemId,
    _addItem: state._addItem,
    updateItem: state.updateItem,
    deleteItem: state.deleteItem,
    setItems: state.setItems,
  };
};

interface UseItemsReturnType extends ItemsStore {
  deleteCurrentList: () => void;
  addItem: (name: string) => void;
}

export const useItems = (): UseItemsReturnType => {
  const viewStore = useStore(itemsSelector);
  const update = useUpdate();
  const updateItem = useCallback(
    (item: DBItemInput) => {
      viewStore.updateItem(item);
      update(StoreNames.ITEMS, { value: item });
    },
    [update, viewStore],
  );
  const addItem = useCallback(
    (name: string) => {
      const item = createItem(name, viewStore);
      viewStore._lastItemId = item.id;
      viewStore._addItem(item);
      update(StoreNames.ITEMS, { value: item });
    },
    [viewStore, update],
  );
  const deleteCurrentList = useCallback(() => {
    viewStore.setItems([]);
    update(StoreNames.ITEMS, { value: null, key: IDBKeyRange.lowerBound(0) });
  }, [update, viewStore]);

  const deleteItem = useCallback(
    (id: number) => {
      viewStore.deleteItem(id);
      update(StoreNames.ITEMS, { value: null, key: id });
    },
    [update, viewStore],
  );

  return {
    ...viewStore,
    deleteCurrentList,
    updateItem,
    addItem,
    deleteItem,
  };
};

type UseListsReturnType = {
  lists: DBList[] | null;
  addListToCurrent: (list: DBList) => void;
  deleteList: (id: number) => void;
  updateList: (list: DBList | DBListInput) => void;
};

export const useLists = (): UseListsReturnType => {
  const update = useUpdate();
  const lists = useRead<DBList[]>(StoreNames.LISTS, { keepResults: true });
  const { addItem } = useItems();
  const addListToCurrent = useCallback(
    (list: DBList) => list.items.forEach((item) => addItem(item.name)),
    [addItem],
  );

  const updateList = useCallback(
    (list: DBList | DBListInput) => update('lists', { value: list }),
    [update],
  );

  const deleteList = useCallback(
    (id: number) => update('lists', { value: null, key: id }),
    [update],
  );

  return { lists, addListToCurrent, deleteList, updateList };
};

export const createItem = (name: string, state: ItemsStore): DBItem => {
  return { name, id: state._lastItemId + 1 };
};
