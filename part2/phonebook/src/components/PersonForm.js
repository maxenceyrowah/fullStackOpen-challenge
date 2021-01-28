export const PersonForm = ({ name, handleChangeContact, number, addPerson }) => (
  <form>
    <div>
      <label>Name: </label>
      <input value={name} onChange={handleChangeContact} name="name" />
    </div>

    <div>
      <label>Number:</label>
      <input value={number} onChange={handleChangeContact} name="number" />
    </div>
    <div>
      <button type="submit" onClick={addPerson}>
        add
      </button>
    </div>
  </form>
);
