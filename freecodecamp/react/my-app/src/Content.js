import ItemList from "./ItemList";
/**
 * Content组件用于渲染一个项目列表或显示无项目信息。
 * 
 * @param {Object[]} items - 项目数组，每个项目是一个对象。
 * @param {Function} handleCheck - 处理勾选项目的函数。
 * @param {Function} handleDelete - 处理删除项目的函数。
 * @returns 返回渲染的React元素。
 */
const Content = ({ items, handleCheck, handleDelete }) => {
  // 根据items数组的长度，决定渲染ItemList组件还是渲染无项目信息的段落。
  return (
    // <></> : React.Fragment的简写，用于包裹多个元素。为什么不可以省略？因为JSX中只能有一个根元素。
    <>
      {/* 在{}内进行判断：如果items数组不为空，则渲染ItemList组件；否则，渲染无项目信息的段落。 */}
      {items.length ? (
        ItemList({ items, handleCheck, handleDelete })
      ) : (
        <p style={{ marginTop: "2rem" }}>No items in the list</p>
      )}
    </>
  );
};

export default Content;
