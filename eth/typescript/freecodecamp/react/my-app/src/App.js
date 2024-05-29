import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  // useEffect: 加载页面时执行，items变化时执行. 
  // 1. 如果 items 不变化，只在加载页面时执行，可以传入空数组
  // 2. 否则，每次 items 变化时都会执行 useEffect
  useEffect(() => {
    console.log("set items");
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);


  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, item };
    const listItems = [...items, newItem];
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!newItem.trim()) return; // Prevent empty items
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )} //
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
