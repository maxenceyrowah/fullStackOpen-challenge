export const Filter = ({ search, handleChangeSearch }) => (
  <div>
    filter shown with <input value={search} name="search" onChange={handleChangeSearch} />
  </div>
);
