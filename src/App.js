import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationWeather from './components/LocationWeather';
import Spinner from './components/Spinner';
import './App.css';

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setErrorMessage(err.message);
        setIsLoaded(true);
      }
    );
  }, []);

  const getWeatherData = async (lat, lon) => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_WEATHER_KEY}`
    );
    setIsLoaded(true);
    const { name } = response.data;
    const { country } = response.data.sys;
    const { description, icon } = response.data.weather[0];
    const { temp } = response.data.main;

    setWeatherData({
      name: name,
      country: country,
      description: description,
      icon: icon,
      temp: Math.round(temp),
    });
  };

  const getWeatherDataSearch = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_WEATHER_KEY}`
      );

      const { name } = response.data;
      const { country } = response.data.sys;
      const { description, icon } = response.data.weather[0];
      const { temp } = response.data.main;

      setWeatherData({
        name: name,
        country: country,
        description: description,
        icon: icon,
        temp: Math.round(temp),
      });
      setErrorMessage('');
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Roboto',
            fontSize: '35px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          City Not Found
        </div>
      );
    } else if (errorMessage !== '') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: '700',
            color: '#A62122',
            textAlign: 'center',
            height: '65vh',
          }}
        >
          Unable to fetch location : {errorMessage}
        </div>
      );
    } else if (!errorMessage && Object.keys(weatherData).length === 0) {
      return <Spinner />;
    } else {
      return (
        <div>
          <LocationWeather weatherData={weatherData} />
        </div>
      );
    }
  };

  const search = (e) => {
    if (e.key === 'Enter') {
      getWeatherDataSearch();
    }
  };

  return (
    <div className="app">
      {isLoaded ? (
        <input
          className="app__searchbar"
          type="text"
          placeholder="Enter City"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      ) : null}

      {renderContent()}
    </div>
  );
};

export default App;
