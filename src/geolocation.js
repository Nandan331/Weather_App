import React, { useState } from 'react';

const CurrentLocation = () => {
  const [result, setResult] = useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update location with coordinates first
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });

          // Fetch weather data using the coordinates
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4bfe4fd8e26b27e7ed10a8752de2d683`
          )
            .then((response) => response.json())
            .then((data) => {
              setResult(data); // Store the entire weather data response
            })
            .catch(() => {
              setLocation((prevState) => ({
                ...prevState,
                error: 'Failed to fetch weather data.',
              }));
            });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by this browser.',
      });
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Current Location</h1>
      <button
        onClick={getLocation}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Get Location
      </button>
      {location.error ? (
        <p style={{ color: 'red' }}>{location.error}</p>
      ) : (
        location.latitude !== null &&
        location.longitude !== null && (
          <div>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )
      )}
      {result && (
        <div>
          <h2>City: {result.name}</h2> {/* Correctly displaying the city name */}
          <h2>Weather: {result.weather[0].description}</h2>
          <p>Temperature: {Math.round(result.main.temp - 273.15)}°C</p>
        </div>
      )}
    </div>
  );
};

export default CurrentLocation;
