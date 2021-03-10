import { DBRecord } from '../db/model';

export interface DBItemInput extends DBRecord {
  name: string;
  isDiscarded?: boolean;
}

interface DBItem extends DBItemInput {
  id: number;
}

export default DBItem;

export const filterPlaceholderItems = (items: DBItem[]): DBItem[] => {
  return items.filter((item) => !item.isDiscarded);
};

export const discardItem = (item: DBItem): DBItem => {
  item.isDiscarded = true;
  return item;
};

export const newItemNamePlaceholder = '5Ft3zDa3bsQKQD';

export const initItems: DBItem[] = [
  { name: 'potatoes', id: 0 },
  { name: 'ham', id: 1 },
  { name: 'Milk', id: 2 },
];
