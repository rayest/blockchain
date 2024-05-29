import { useEffect } from "react";

import { useState } from "react";

import Form from "./Form";

import List from "./List";
import Table from "./Table";
function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [reqType, setReqType] = useState("users");
  const [items, setItems] = useState([]);

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
