export const Weather = ({ name, weather }) => {
  return (
    <>
      <h3>Weather in {name}</h3>
      <p>temperature: {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} alt="" />
      <p>
        wind: {weather.wind_degree} mph direction {weather.wind_dir}
      </p>
    </>
  );
};
