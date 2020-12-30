import create from 'zustand';
import Item from '../model/items';
import { createItem } from './items';

export type ItemsStore = {
  items: Item[];
  addItem: (name: string) => void;
  removeItem: (id: number) => void;
  updateItem: (newName: string, id: number) => void;
};

export type Store = ItemsStore;

const initItems = [
  { name: 'potatoes', id: 0 },
  { name: 'ham', id: 1 },
  { name: 'Milk', id: 2 },
];

const useStore = create<Store>((set) => ({
  items: initItems,
  addItem: (name: string): void => {
    set((state) => {
      const newItem = createItem(name, state);
      return { items: [newItem].concat(state.items) };
    });
  },
  updateItem: (newName: string, id: number): void => {
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (!item) {
        return state;
      } else {
        item.name = newName;
        return { items: [...state.items] };
      }
    });
  },
  removeItem: (id: number): void =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export default useStore;
