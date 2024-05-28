import ItemList from "./ItemList";
const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        ItemList({ items, handleCheck, handleDelete })
      ) : (
        <p style={{ marginTop: "2rem" }}>No items in the list</p>
      )}
    </main>
  );
};

export default Content;
