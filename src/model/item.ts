interface Item {
  name: string;
  id: number;
  isDiscarded?: boolean;
}

export default Item;

export const filterPlaceholderItems = (items: Item[]): Item[] => {
  return items.filter((item) => !item.isDiscarded);
};

export const discardItem = (item: Item): Item => {
  item.isDiscarded = true;
  return item;
};
