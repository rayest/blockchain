import "./css/style.css";

import FullList from "./model/FullList";
import ListTemplate from "./templates/ListTemplate";
import ListItems from "./model/ListItems";

const initApp = (): void => {
  const fullList: FullList = FullList.instance;
  const listTemplate: ListTemplate = ListTemplate.instance;

  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if (!newEntryText.length) {
      return;
    }
    
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem: ListItems = new ListItems(itemId.toString(), newEntryText);

    fullList.additem(newItem);
    listTemplate.render(fullList);
  });

  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearItems.addEventListener("click", () => {
    fullList.clearList();
    listTemplate.clear();
  });

  fullList.load();
  listTemplate.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
