import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Convenient() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count,setCount] = useState(0)

  const fetchWeatherData = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          throw new Error(data.message);
        }
        setWeatherData(data);
        setError(null);
      })
      .catch((err) => {
        setWeatherData(null);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  // Fetch weather data based on geolocation
  const getGeolocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4bfe4fd8e26b27e7ed10a8752de2d683&units=metric`
          );
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Geolocation permission denied. Please search for a city.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Handle city search
  const onSearchHandler = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      fetchWeatherData(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4bfe4fd8e26b27e7ed10a8752de2d683&units=metric`
      );
      setSearch(''); // Clear search input after fetching
    }
  };

  // Load geolocation weather on initial render
  useEffect(() => {
    console.log("current location is mounted")
    // setCount(count+2)
  }, [getGeolocationWeather]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Weather App</h1>
      <form onSubmit={onSearchHandler} className="d-flex justify-content-center mt-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ms-2">
          Search
        </button>
      </form>
      <button className='btn btn primary' onClick={getGeolocationWeather}>getLocation</button>

      {loading && <p className="text-center mt-4">Loading...</p>}

      {error && <p className="text-danger text-center mt-4">{error}</p>}


      {weatherData && (
        <div className="mt-4 text-center">
          <h2>{weatherData.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
        </div>
      )}
    </div>
  );
}

export default Convenient;
