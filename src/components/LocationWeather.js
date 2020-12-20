import React from 'react';
import './LocationWeather.css';

const LocationWeather = ({ weatherData }) => {
  return (
    <>
      {weatherData.temp > 25 ? (
        <div className="locationweather above">
          <div className="locationweather__name">
            {weatherData.name}, {weatherData.country}
          </div>
          <div className="locationweather__icon">
            <img
              src={`https://openweathermap.org/img/w/${weatherData.icon}.png`}
              alt=""
            />
          </div>
          <div className="locationweather__temperature">
            {weatherData.temp}°C
          </div>
          <div className="locationweather__description">
            {weatherData.description}
          </div>
          <div className="locationweather__customtext">
            <div style={{ color: 'red' }}>Let's hit the beach</div>
          </div>
        </div>
      ) : (
        <div className="locationweather below">
          <div className="locationweather__name">
            {weatherData.name}, {weatherData.country}
          </div>
          <div className="locationweather__icon">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.icon}.png`}
              alt=""
            />
          </div>
          <div className="locationweather__temperature">
            {weatherData.temp}°C
          </div>
          <div className="locationweather__description">
            {weatherData.description}
          </div>
          <div className="locationweather__customtext">
            <div>Burr, Its chilly</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationWeather;
