import React, { useState, useEffect } from 'react';
import Weather from './Weather';

const API_KEY = '9ab4684ce216cced161fdffe709a77ff';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [uvData, setUvData] = useState(null); // Состояние для UV-индекса
    const [city, setCity] = useState('Novosibirsk');
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const loadWeather = async () => {
            const geoResp = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
            );
            const geoData = await geoResp.json();

            const { lat, lon } = geoData[0];
            setLocation({ lat, lon });

            const weatherResp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const weatherData = await weatherResp.json();
            setWeatherData(weatherData);
            
            const uvResp = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const uvData = await uvResp.json();
            setUvData(uvData);
        };

        loadWeather();
        const weatherInterval = setInterval(loadWeather, 3 * 3600 * 1000); 
        return () => clearInterval(weatherInterval);
    }, [city]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date()); 
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    const isNight = currentTime.getHours() >= 18 || currentTime.getHours() < 6;
    const backgroundColor = isNight ? '#0c031f' : '#1d66cc';

    const formatTime = (date) => {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, 
        });
    };

    return (
        <div
            style={{
                textAlign: 'center',
                paddingTop: '20px',
                minHeight: '100vh',
                margin: 0,
                backgroundColor: backgroundColor,
            }}
        >
            {/* <h1>Текущее время: {formatTime(currentTime)}</h1> */}
            {weatherData && uvData ? (
                <Weather weatherData={weatherData} city={city} location={location} uvData={uvData} isNight={isNight}/>
            ) : (
                <p>Загрузка данных о погоде...</p>
            )}
        </div>
    );
};

export default App;