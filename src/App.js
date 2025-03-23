import React, { useState, useEffect } from 'react';
import Weather from './Weather';

const API_KEY = '9ab4684ce216cced161fdffe709a77ff';

const App = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState('Novosibirsk');
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [geoData, setGeoData] = useState(null);
    useEffect(() => {
      const loadWeather = async () => {
          const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
          const data = await geoResponse.json();
          setGeoData(data);
        };
        loadWeather();
    }, [city]);

    return (
      <div>
          <h1>Геоданные для города: {city}</h1>
          {geoData && geoData.length > 0 ? (
              <div>
                  <p>Город: {geoData[0].name}</p>
                  <p>Широта: {geoData[0].lat}</p>
                  <p>Долгота: {geoData[0].lon}</p>
              </div>
          ) : (
              <p>Загрузка геоданных...</p>
          )}
      </div>
  );
}

export default App;
