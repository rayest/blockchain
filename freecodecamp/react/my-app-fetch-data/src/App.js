import { useEffect } from "react";

import { useState } from "react";

import Form from "./Form";

import List from "./List";
import Table from "./Table";
function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [reqType, setReqType] = useState("users");
  const [items, setItems] = useState([]);

  // hooks：useEffect：在组件渲染后执行一次，用于获取数据。
  // 并且监听 reqType 的变化，当 reqType 发生变化时，重新获取数据。
  useEffect(() => {
    fetch(`${API_URL}${reqType}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [reqType]);

  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType} />
      {/* <List items={items}/> */}
      <Table items={items} />
    </div>
  );
}

export default App;
