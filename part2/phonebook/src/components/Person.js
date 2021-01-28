export const Person = ({ persons, deletePerson }) =>
  persons.map((person) => (
    <p key={person.name}>
      {person.name}
      <span>{person.number}</span>
      <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </p>
  ));
