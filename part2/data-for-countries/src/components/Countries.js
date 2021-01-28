import { useState } from 'react';
import { CountrieDetails } from './CountrieDetails';

export const Countries = ({ countries, country }) => {
  const [showCounty, setShowCounty] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const handleShowCountryDetails = (countryDetails) => {
    setShowCounty(countryDetails);
    setIsVisible(true);
  };

  return (
    <>
      {showCounty && isVisible && <CountrieDetails country={showCounty} />}

      {country ? (
        <CountrieDetails country={country[0]} />
      ) : (
        !isVisible && (
          <ul>
            {countries.map((country, index) => (
              <li key={index}>
                {country.name}
                <button onClick={(e) => handleShowCountryDetails(country)}>show</button>
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
};
