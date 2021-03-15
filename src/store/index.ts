import create, { PartialState } from 'zustand';
import DBItem, { DBItemInput, discardItem, filterPlaceholderItems } from '../model/item';

export type ItemsStore = {
  items: DBItem[];
  _addItem: (item: DBItem) => void;
  deleteItem: (id: number, isDiscarded: boolean) => void;
  updateItem: (item: DBItemInput | DBItem) => void;
  setItems: (newItems: DBItem[]) => void;
  _lastItemId: number;
};

export type LayoutStore = {
  themeColor: string;
  setThemeColor: (themeColor: string) => void;
  isShowDiscardedItems: boolean;
  toggleIsShowDiscardedItems: () => void;
  isSidenavHidden: boolean;
  toggleIsSidenavHidden: () => void;
};

export type Store = ItemsStore & LayoutStore;

const useStore = create<Store>((set) => ({
  items: [],
  _lastItemId: 0,
  _addItem: (item: DBItem): void => addItem(set, item),
  updateItem: (item: DBItemInput | DBItem): void => updateItem(set, item),
  deleteItem: (id: number, isDiscarded: boolean): void =>
    deleteItem(set, id, isDiscarded),
  setItems: (newItems: DBItem[]): void => set(() => ({ items: newItems })),
  isSidenavHidden: true,
  toggleIsSidenavHidden: (): void =>
    set((state) => ({
      isSidenavHidden: !state.isSidenavHidden,
    })),
  isShowDiscardedItems:
    window.localStorage.getItem('isShowDiscardedItems') === 'true' || false,
  toggleIsShowDiscardedItems: (): void =>
    set(() => ({
      isShowDiscardedItems: toggleIsShowDiscardedItems(),
    })),
  themeColor: window.localStorage.getItem('themeColor') || '#fdcdcd',
  setThemeColor: (themeColor: string): void => set(() => setThemeColor(themeColor)),
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

function deleteItem(set: StoreSetter, id: number, isDiscarded: boolean): void {
  set((state) => {
    let discardedItem: DBItem | null = null;
    const newItems = filterPlaceholderItems(state.items).map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        discardedItem = { ...item, isDiscarded: true };
        return discardItem(item);
      }
    });
    if (discardedItem && !isDiscarded) {
      newItems.push(discardedItem);
    }
    return { items: newItems };
  });
}

export function loadItems(items: DBItem[]): void {
  let maxId = 0;
  items.forEach(({ id }) => (maxId = id > maxId ? id : maxId));
  useStore.getState()._lastItemId = maxId;
  useStore.getState().setItems(items);
}

function setThemeColor(themeColor: string): { themeColor: string } {
  window.localStorage.setItem('themeColor', themeColor);
  return { themeColor };
}

function toggleIsShowDiscardedItems(): boolean {
  const isShowDiscardedItems =
    window.localStorage.getItem('isShowDiscardedItems') === 'true';
  window.localStorage.setItem(
    'isShowDiscardedItems',
    isShowDiscardedItems ? 'false' : 'true',
  );
  return !isShowDiscardedItems;
}
