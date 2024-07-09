import React, { useEffect, useRef, useState } from 'react';
import './weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

// For translations
import { translations } from '../assets/data';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null); // Initialize with null
  const [language, setLanguage] = useState('HUN'); // Set default language

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const selectLanguage = (lang) => {
    setLanguage(lang);
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter City name");
      return;
    }
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (err) {
      setWeatherData(null); // Set to null on error
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("Győr");
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  return (
    <div className='weather'>
      <div className="search-bar">
        <input
          ref={inputRef}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder={translations[language].inputPlaceHolder}
        />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="col left">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>{translations[language].humidity}</span>
              </div>
            </div>
            <div className="col right">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>{translations[language].windSpeed}</span>
              </div>
            </div>
          </div>
          <div className="language-selector">
          {Object.keys(translations).map((lang) => (
            <button key={lang} onClick={() => selectLanguage(lang)}>
              {lang}
            </button>
          ))}
        </div>
        </>
      ) : (
        <p>{translations[language].inputPlaceHolder}</p>
        
      )}
    </div>
  );
};

export default Weather;
