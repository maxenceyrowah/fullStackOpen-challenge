import { useState, useEffect } from 'react';
import { Filter } from './components/Filter';
import { Notification } from './components/Notification';
import { Person } from './components/Person';
import { PersonForm } from './components/PersonForm';
import ApiPersons from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [contact, setContact] = useState({
    name: '',
    number: ''
  });
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  });
  const [showErroMessage, setShowErroMessage] = useState(false);
  const { name, number } = contact;

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = () => {
    ApiPersons.getPersons()
      .then((persons) => setPersons(persons))
      .catch((error) => console.error(error));
  };

  const filterName = search.length
    ? persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons;

  const handleChangeContact = (e) => {
    const { value, name } = e.target;
    const content = { ...contact };
    content[name] = value;
    setContact(content);
  };
  const handleChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    if (search) return filterName;
  };

  const delayOfNotification = (params) => {
    setNotification({
      message: params.message,
      type: params.type
    });

    setTimeout(() => {
      setNotification({
        message: null,
        type: null
      });
    }, 5000);
  };
  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name, number };
    const isPerson = filterName.find((person) => person.name.toLowerCase() === name.toLowerCase());

    if (
      isPerson &&
      window.confirm(`${isPerson.name} is already added to phonebook, replace the old number with a new one?`)
    ) {
      if (number) {
        updatePerson(isPerson.id, { name, number });
      } else {
        return alert(`Please enter a new number for the update`);
      }
    } else {
      ApiPersons.postPerson(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setContact({ name: '', number: '' });
          delayOfNotification({
            message: `Added ${person.name}`,
            type: `succes__style`
          });
          setShowErroMessage(true);
        })
        .catch((error) => {
          delayOfNotification({
            message: `An error occurred while adding a contact.`,
            type: `error__style`
          });
        });
    }
  };
  const deletePerson = (personId, name) => {
    if (personId && window.confirm(`Delete ${name} ?`)) {
      ApiPersons.deletePerson(personId)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personId));
          delayOfNotification({
            message: `successful removal`,
            type: `succes__style`
          });
          setShowErroMessage(true);
        })
        .catch((error) => {
          delayOfNotification({
            message: `An error occurred while deleting`,
            type: `error__style`
          });
        });
    }
  };
  const updatePerson = (personId, data) => {
    if (personId) {
      ApiPersons.putPerson(personId, data)
        .then((response) => {
          setPersons(persons.map((person) => (person.id !== response.id ? person : response)));
          setContact({ name: '', number: '' });
          delayOfNotification({
            message: `Updaded ${response.name}`,
            type: `succes__style`
          });
          setShowErroMessage(true);
        })
        .catch((error) => {
          delayOfNotification({
            message: `the person '${data.name}' was already deleted from server`,
            type: `error__style`
          });
          setPersons(persons.filter((person) => person.id !== personId));
        });
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {showErroMessage && <Notification notify={notification} />}
      <Filter search={search} handleChangeSearch={handleChangeSearch} />

      <div>
        <h2>Add a new</h2>
        <PersonForm name={name} number={number} addPerson={addPerson} handleChangeContact={handleChangeContact} />
      </div>

      <h2>Numbers</h2>
      <Person persons={filterName} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
