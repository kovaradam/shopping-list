import { useCallback } from 'react';
import useStore, { Store, ItemsStore } from '.';
import { StoreNames } from '../config';
import DBItem, { DBItemInput, filterPlaceholderItems } from '../model/item';
import { DBList, DBListInput } from '../model/list';
import { update, useUpdate } from 'indexeddb-hooked';

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
  addItems: (items: DBItemInput[]) => void;
}

export const useItems = (): UseItemsReturnType => {
  const viewStore = useStore(itemsSelector);
  const updateItem = useCallback(
    (item: DBItemInput) => {
      viewStore.updateItem(item);
      update(StoreNames.ITEMS, { value: item }, false);
    },
    [viewStore],
  );
  const addItem = useCallback(
    (name: string) => {
      const item = createViewStoreItem({ name }, viewStore);
      addItemToViewStore(item, viewStore);
      update(StoreNames.ITEMS, { value: item }, false);
    },
    [viewStore],
  );
  const addItems = useCallback(
    (items: DBItemInput[]) => {
      items = items.reverse();
      const newItems = items.map((item) => {
        const newItem = createViewStoreItem(item, viewStore);
        addItemToViewStore(newItem, viewStore);
        return { value: newItem };
      });

      update(StoreNames.ITEMS, newItems, false);
    },
    [viewStore],
  );
  const deleteCurrentList = useCallback(() => {
    viewStore.setItems([]);
    update(StoreNames.ITEMS, { value: null, key: IDBKeyRange.lowerBound(0) });
  }, [viewStore]);

  const deleteItem = useCallback(
    (id: number, isDiscarded: boolean) => {
      viewStore.deleteItem(id, isDiscarded);
      if (!isDiscarded) {
        update(StoreNames.ITEMS, { value: { isDiscarded: true, id: -id }, key: id });
      }
      update(StoreNames.ITEMS, { value: null, key: id });
    },
    [viewStore],
  );

  return {
    ...viewStore,
    deleteCurrentList,
    updateItem,
    addItem,
    deleteItem,
    addItems,
  };
};

type UseListsReturnType = {
  deleteList: (id: number) => void;
  updateList: (list: DBList | DBListInput) => void;
};

export const useLists = (): UseListsReturnType => {
  const update = useUpdate();

  const updateList = useCallback(
    (list: DBList | DBListInput) => {
      list.items = filterPlaceholderItems(list.items);
      update('lists', { value: list });
    },
    [update],
  );

  const deleteList = useCallback(
    (id: number) => update('lists', { value: null, key: id }),
    [update],
  );

  return { deleteList, updateList };
};

function createViewStoreItem(item: DBItemInput, state: ItemsStore): DBItem {
  return { ...item, id: state._lastItemId + 1 };
}

function addItemToViewStore(item: DBItem, state: ItemsStore): void {
  state._lastItemId = item.id;
  state._addItem(item);
}
