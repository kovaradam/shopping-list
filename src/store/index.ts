import create from 'zustand';
import Item, { discardItem, filterPlaceholderItems } from '../model/item';
import { createItem } from './items';

export type ItemsStore = {
  items: Item[];
  addItem: (name: string) => void;
  removeItem: (id: number) => void;
  updateItem: (newName: string, id: number) => void;
  _lastItemId: number;
};

export type LayoutStore = {
  isSideNavbarHidden: boolean;
  toggleIsSidenavbar: () => void;
};

export type Store = ItemsStore & LayoutStore;

const initItems: Item[] = [
  { name: 'potatoes', id: 0 },
  { name: 'ham', id: 1 },
  { name: 'Milk', id: 2 },
];

const useStore = create<Store>((set) => ({
  items: initItems,
  _lastItemId: 2,
  addItem: (name: string): void => {
    set((state) => {
      const newItem = createItem(name, state);
      return {
        items: [newItem].concat(filterPlaceholderItems(state.items)),
        _lastItemId: newItem.id,
      };
    });
  },
  updateItem: (newName: string, id: number): void => {
    set((state) => {
      const newItems = filterPlaceholderItems(state.items);
      const item = newItems.find((item) => item.id === id);
      if (!item) {
        return state;
      } else {
        item.name = newName;
        return { items: [...newItems] };
      }
    });
  },
  removeItem: (id: number): void => {
    set((state) => {
      const newItems = filterPlaceholderItems(state.items).map((item) => {
        if (item.id !== id) {
          return item;
        } else {
          return discardItem(item);
        }
      });
      return { items: newItems };
    });
  },
  isSideNavbarHidden: true,
  toggleIsSidenavbar: (): void =>
    set((state) => ({
      isSideNavbarHidden: !state.isSideNavbarHidden,
    })),
}));

export default useStore;
