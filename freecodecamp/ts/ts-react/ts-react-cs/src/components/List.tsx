import { ReactNode } from "react";

interface ListProps<T> {
  items: T[];
  render: (item: T) => ReactNode;
}

// 这个List组件接受一个泛型T，这个泛型T是items数组里的每一个元素的类型
const List = <T,>({ items, render }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{render(item)}</li>
      ))}
    </ul>
  );
};

export default List;
