const SearchItem = ({ search, setSearch }) => {
  return (
    // onSubmit={(e) => e.preventDefault() 防止表单提交
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        role="search" // ARIA role
        placeholder="Search Item"
        required
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
