import "./App.css";

import Heading from "./components/Heading";
import { Section } from "./components/Section";
import Counter from "./components/Counter";
import { useState } from "react";
import List from "./components/List";

function App() {
  const [count, setCount] = useState<number>(1);

  return (
    <>
      <Heading title="hello" />
      <Section title={"Different title"}>This is My Section</Section>
      <Counter setCount={setCount}> Count is {count}</Counter>
      <List
        items={["☕️ Coffee", "🌯️ Tacos", "💻 Code"]}
        // 这个 render 是一个函数，这个函数接受一个参数，这个参数是items数组里的每一个元素
        render={(item: string) => <span className="gold">{item}</span>}
      />
    </>
  );
}
export default App;
