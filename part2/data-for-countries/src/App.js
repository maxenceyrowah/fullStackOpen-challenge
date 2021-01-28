import { useEffect, useState } from 'react';
import axios from 'axios';
import { Countries } from './components/Countries';
import { AlertMessage } from './components/AlertMessage';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCountries();
  }, []);

  const handleSearchCountrie = (e) => setSearch(e.target.value);
  const searchCountries = search.length
    ? countries.filter((countrie) => countrie.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const getCountries = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then((countries) => setCountries(countries.data))
      .catch((error) => console.error(error));
  };

  const alert = search.length && searchCountries.length > 10 ? `Too many matches, specify another filter` : '';
  const country = search && searchCountries.length === 1 && searchCountries;

  return (
    <>
      <p>
        find countries: <input value={search} onChange={handleSearchCountrie} />
      </p>
      {alert ? <AlertMessage alert={alert} /> : <Countries countries={searchCountries} country={country} />}
    </>
  );
};

export default App;
