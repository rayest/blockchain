import { FaPlus } from "react-icons/fa";
import { useRef } from "react";
const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">AddItem</label>
      <input
        autoFocus
        ref={inputRef}
        type="text"
        name=""
        id="addItem"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()} // Focus on input
      >
        <FaPlus /> {/* add icon */}
      </button>
    </form>
  );
};

export default AddItem;
