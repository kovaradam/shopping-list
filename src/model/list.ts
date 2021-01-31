import Item from './item';

type DBList = {
  name: string;
  id: number;
  items: Item[];
};

export default DBList;

export const initLists: DBList[] = [
  {
    name: 'Bacon and eggies',
    id: 0,
    items: [
      { name: 'bacon', id: 3 },
      { name: 'eggies', id: 4 },
    ],
  },
  {
    name: 'Curry chicken',
    id: 1,
    items: [
      { name: 'rice', id: 5 },
      { name: 'chicken', id: 6 },
      { name: 'curry', id: 7 },
    ],
  },
  {
    name: 'Eggies and bacon',
    id: 2,
    items: [
      { name: 'bacon', id: 8 },
      { name: 'eggies', id: 9 },
    ],
  },
];
