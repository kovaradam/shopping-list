import { read, Config } from 'indexeddb-hooked';
import { initItems } from './model/item';
import { initLists } from './model/list';
import { loadItems } from './store';

export enum StoreNames {
  LISTS = 'lists',
  ITEMS = 'items',
  ITEM_NAMES = 'item-names',
}

export const DBConfig: Config = {
  version: 1,
  objectStores: [
    {
      name: StoreNames.ITEMS,
      options: { keyPath: 'id' },
      indexes: [{ name: 'id', keyPath: 'id', options: { unique: true } }],
      data: initItems,
    },
    {
      name: StoreNames.ITEM_NAMES,
    },
    {
      name: StoreNames.LISTS,
      // if keyPath, store uses in-line keys, if not, keys must be provided
      options: { keyPath: 'id', autoIncrement: true },
      indexes: [{ name: 'id', keyPath: 'id', options: { unique: true } }],
      data: initLists,
    },
  ],
  onOpenSuccess: async () =>
    loadItems(await read(StoreNames.ITEMS, { direction: 'prev' })),
};
