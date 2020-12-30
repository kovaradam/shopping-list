import useStore, { Store, ItemsStore } from '.';
import Item from '../model/items';

const itemsSelector = (state: Store): ItemsStore => {
  return {
    items: state.items,
    addItem: state.addItem,
    updateItem: state.updateItem,
    removeItem: state.removeItem,
  };
};

export const useItems = (): ReturnType<typeof itemsSelector> => {
  return useStore(itemsSelector);
};

export const createItem = (name: string, state: Store): Item => {
  return { name, id: state.items.length };
};
