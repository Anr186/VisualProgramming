import React from 'react';

const Weather = ({ weatherData, city, location, uvData }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-EN', { weekday: 'long', day: 'numeric' });
    };

    const currentDate = formatDate(weatherData.list[0].dt_txt);

    const currentTime = new Date();

    const findCurrentIndex = () => {
        return weatherData.list.findIndex((forecast) => {
            const forecastTime = new Date(forecast.dt_txt).getTime();
            const timeDifference = Math.abs(forecastTime - currentTime.getTime());
            return timeDifference <= 3600 * 1000; 
        });
    };
    const currentIndex = findCurrentIndex();
    const hourlyForecasts = weatherData.list.slice(currentIndex, currentIndex + 4);

    return (
        <div style={styles.container}>
            <h1 style={styles.cityName}>{city}</h1>
            <h2 style={styles.currentDate}>{currentDate}</h2>
            <h2 style={styles.temperature}>{Math.round(hourlyForecasts[0].main.temp)}°</h2>
            
            <div style={styles.hourlyForecast}>
                {hourlyForecasts.map((forecast, index) => (
                    <div key={index} style={styles.forecastItem}>
                        <p>{index === 0 ? 'Now' : `${new Date(forecast.dt_txt).getHours()}:00`}</p>
                        <p>{Math.round(forecast.main.temp)}°</p>
                    </div>
                ))}
            </div>

            <div style={styles.weatherDetails}>
                <div style={styles.detailItem}>
                    <p style={styles.detailLabel}>Humidity</p>
                    <p style={styles.detailValue}>{hourlyForecasts[0].main.humidity}%</p>
                </div>
                <div style={styles.detailItem}>
                    <p style={styles.detailLabel}>Wind</p>
                    <p style={styles.detailValue}>{Math.round(hourlyForecasts[0].wind.speed)} m/s</p>
                </div>
                <div style={styles.detailItem}>
                    <p style={styles.detailLabel}>Air Pressure</p>
                    <p style={styles.detailValue}>{hourlyForecasts[0].main.pressure} hPa</p>
                </div>
                <div style={styles.detailItem}>
                    <p style={styles.detailLabel}>UV</p>
                    <p style={styles.detailValue}>{Math.round(uvData.value)}</p>
                </div>
            </div>

            {weatherData.list.filter((forecast, index) => (index + 1) % 8 === 0).map((forecast, index) => (
                <div key={index} style={styles.dailyForecast}>
                    <p>{formatDate(forecast.dt_txt)}</p>
                    <p>{Math.round(forecast.main.temp)}°</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        padding: '20px',
        textAlign: 'center',
    },
    cityName: {
        fontSize: '2rem',
        marginBottom: '10px',
    },
    currentDate: {
        fontSize: '1.5rem',
        margin: '10px 0',
        color: '#666',
    },
    temperature: {
        fontSize: '3rem',
        margin: '10px 0',
    },
    hourlyForecast: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px 0',
    },
    forecastItem: {
        textAlign: 'center',
    },
    weatherDetails: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px 0',
    },
    detailItem: {
        textAlign: 'center',
    },
    detailLabel: {
        fontSize: '1rem',
        margin: '5px 0',
        fontWeight: 'bold',
    },
    detailValue: {
        fontSize: '1.2rem',
        margin: '5px 0',
    },
    dailyForecast: {
        margin: '10px 0',
    },
};

export default Weather;