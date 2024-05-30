import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";
import apiRequest from "./apiRequest";

/**
 * App组件：管理购物清单的应用主组件。
 *
 * 该组件维护一个购物清单的状态，并提供添加、删除、检查项目的功能。
 * 使用React的useState和useEffect钩子来管理组件的状态和副作用。
 */
function App() {
  const API_URL = "http://localhost:3500/items";

  // 使用useState钩子初始化状态：购物清单、新项目、搜索关键字、获取数据错误信息和加载状态。
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect钩子：加载页面时和items变化时执行，用于获取和更新购物清单数据。
  useEffect(() => {
    console.log("set items");
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Fetch items data failed");
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        console.log(error.message);
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // 页面加载2秒后执行获取数据操作
    setTimeout(() => {
      (async () => fetchItems())();
    }, 2000);
  }, []);

  // 添加新项目到购物清单，并通过API保存。
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, item };
    const listItems = [...items, newItem];
    setItems(listItems);

    // 发送POST请求添加新项目
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) {
      setFetchError(result);
    }
  };

  // 检查或取消检查购物清单中的项目，并通过API更新状态。
  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    // 发送PATCH请求更新项目状态
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) {
      setFetchError(result);
    }
  };

  // 从购物清单中删除指定项目，并通过API进行删除操作。
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    // 发送DELETE请求删除项目
    const deleteOptions = {
      method: "DELETE",
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) {
      console.log(result);
      setFetchError(result);
    }
  };

  // 处理添加项目表单的提交事件，防止默认提交行为并添加新项目。
  const handleSubmit = (e) => {
    e.preventDefault(); // 防止表单提交
    if (!newItem.trim()) return; // 防止添加空项目
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  // 渲染组件UI，根据状态显示加载指示器、错误信息、搜索结果等。
  return (
    <div className="App">
      <Header title="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {loading && <p>Loading...</p>}

        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

        {!fetchError && !loading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
