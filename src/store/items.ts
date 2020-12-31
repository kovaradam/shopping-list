import useStore, { Store, ItemsStore } from '.';
import Item from '../model/item';

const itemsSelector = (state: Store): ItemsStore => {
  return {
    items: state.items,
    _lastItemId: state._lastItemId,
    addItem: state.addItem,
    updateItem: state.updateItem,
    removeItem: state.removeItem,
  };
};

export const useItems = (): ReturnType<typeof itemsSelector> => {
  return useStore(itemsSelector);
};

export const createItem = (name: string, state: Store): Item => {
  return { name, id: state._lastItemId + 1 };
};
