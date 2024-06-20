import "./App.css";

import Heading from "./components/Heading";
import { Section } from "./components/Section";
import Counter from "./components/Counter";
import {
  useCallback,
  useEffect,
  useState,
  useRef,
  MouseEvent,
  KeyboardEvent,
  useMemo,
} from "react";
import List from "./components/List";

interface User {
  username: string;
  id: number;
}

type fibFunc = (n: number) => number;

const fib: fibFunc = (n) => {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};

const myNumber: number = 10;

function App() {
  const [count, setCount] = useState<number>(1);
  const [users, setUsers] = useState<User[] | null>(null);

  // useRef 用于获取DOM元素，当我们想要获取一个DOM元素的时候，我们可以使用useRef
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  // 当组件挂载的时候，我们会调用这个useEffect
  useEffect(() => {
    console.log("mounting");
    console.log("users:", users);

    return () => {
      console.log("unmounting");
    };
  }, []);

  const addTwo = useCallback(
    (
      e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ): void => {
      setCount((prev) => prev + 2);
    },
    []
  );

  // useMemo 会缓存一个函数的返回值，只有当依赖项 myNumber 发生变化的时候，才会重新计算
  const result = useMemo<number>(() => {
    return fib(myNumber);
  }, [myNumber]);

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

      {/* another counter */}
      <button onClick={addTwo}>Add Two</button>
      <h2>{result}</h2>
      <input ref={inputRef} type="text" name="" id="" />
    </>
  );
}
export default App;
