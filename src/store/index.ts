import create, { PartialState } from 'zustand';
import DBItem, { DBItemInput, discardItem, filterPlaceholderItems } from '../model/item';

export type ItemsStore = {
  items: DBItem[];
  _addItem: (item: DBItem) => void;
  deleteItem: (id: number) => void;
  updateItem: (item: DBItemInput | DBItem) => void;
  setItems: (newItems: DBItem[]) => void;
  _lastItemId: number;
};

export type LayoutStore = {
  isSidenavHidden: boolean;
  toggleIsSidenavHidden: () => void;
};

export type Store = ItemsStore & LayoutStore;

const useStore = create<Store>((set) => ({
  items: [],
  _lastItemId: 0,
  _addItem: (item: DBItem): void => addItem(set, item),
  updateItem: (item: DBItemInput | DBItem): void => updateItem(set, item),
  deleteItem: (id: number): void => deleteItem(set, id),
  setItems: (newItems: DBItem[]): void => set(() => ({ items: newItems })),
  isSidenavHidden: true,
  toggleIsSidenavHidden: (): void =>
    set((state) => ({
      isSidenavHidden: !state.isSidenavHidden,
    })),
}));

export default useStore;

type StoreSetter = (partial: PartialState<Store>, replace?: boolean) => void;

function addItem(set: StoreSetter, item: DBItem): void {
  set((state) => {
    return {
      items: [item].concat(filterPlaceholderItems(state.items)),
      _lastItemId: item.id,
    };
  });
}

function updateItem(set: StoreSetter, updateItem: DBItemInput | DBItem): void {
  set((state) => {
    const { name, id } = updateItem;
    const newItems = filterPlaceholderItems(state.items);
    const item = newItems.find((item) => item.id === id);
    if (!item) {
      return state;
    } else {
      item.name = name;
      return { items: [...newItems] };
    }
  });
}

function deleteItem(set: StoreSetter, id: number): void {
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
}

export function loadItems(items: DBItem[]): void {
  let maxId = 0;
  items.forEach(({ id }) => (maxId = id > maxId ? id : maxId));
  useStore.getState()._lastItemId = maxId;
  useStore.getState().setItems(items);
}
