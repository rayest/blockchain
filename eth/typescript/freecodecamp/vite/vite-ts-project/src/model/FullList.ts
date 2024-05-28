import ListItems from "./ListItems";

interface List {
  list: ListItems[];
  load(): void;
  save(): void;
  clearList(): void;
  additem(item: ListItems): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  constructor(private _list: ListItems[] = []) {}

  get list(): ListItems[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") {
      return;
    }

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
        JSON.parse(storedList);
      
      parsedList.forEach((item) => {
          const listItem: ListItems = new ListItems(
              item._id,
              item._item,
              item._checked
          );
          this._list.push(listItem);
      });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  additem(item: ListItems): void {
    this._list.push(item);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
