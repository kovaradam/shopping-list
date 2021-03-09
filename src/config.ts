import { Config } from './db/init';
import { read } from './db/operators';
import { initItems } from './model/item';
import { initLists } from './model/list';
import { loadItems } from './store';

export enum StoreNames {
  LISTS = 'lists',
  ITEMS = 'items',
}

export const DBConfig: Config = {
  objectStores: [
    {
      name: StoreNames.ITEMS,
      options: { keyPath: 'id' },
      indexes: [{ name: 'id', keyPath: 'id', options: { unique: true } }],
      data: initItems,
    },
    {
      name: StoreNames.LISTS,
      // if autoIncrement is falsy, keys must be provided on transactions
      options: { keyPath: 'id', autoIncrement: true },
      indexes: [{ name: 'id', keyPath: 'id', options: { unique: true } }],
      data: initLists,
    },
  ],
  onOpen: async () => loadItems(await read(StoreNames.ITEMS)),
};
