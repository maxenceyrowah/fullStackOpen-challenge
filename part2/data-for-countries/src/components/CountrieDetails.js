/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Weather } from './Weather';

const api_key = process.env.REACT_APP_API_KEY;

export const CountrieDetails = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    getWeatherOfCountry();
  }, [country.name]);

  const getWeatherOfCountry = () => {
    if (country) {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
        .then((weather) => setWeather(weather.data.current))
        .catch((error) => console.error(error));
    }
  };
  return (
    <>
      <h1>{country.name}</h1>
      <div>
        <p>
          Capital: <span>{country.capital}</span>
        </p>
        <p>
          Population: <span>{country.population}</span>
        </p>
      </div>
      <div>
        <h3>languages</h3>
        <ul>
          {country.languages.map((language, index) => (
            <li key={index}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="" height={150} width={150} />
        <Weather weather={weather} name={country.name} />
      </div>
    </>
  );
};
