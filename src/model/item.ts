import { DBRecord } from '../db/model';

export interface DBItemInput extends DBRecord {
  name: string;
  volume?: number;
  units?: string;
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
  { name: 'potatoes', volume: 1, units: 'kg', id: 0 },
  { name: 'ham', volume: 200, units: 'g', id: 1 },
  { name: 'Milk', volume: 1, units: 'l', id: 2 },
];
