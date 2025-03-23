import React from 'react';

const Weather = ({ weatherData, city, location, uvData, isNight, hour }) => {
    const startIndex = weatherData.list.findIndex(forecast => {
        const forecastHour = new Date(forecast.dt_txt).getHours();
        return forecastHour === hour;
    });

    const hourlyForecasts = weatherData.list.slice(startIndex, startIndex + 5);

    const formatTime = (hour) => {
        return `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.currentDate}>{formatTime(hour)}</h1>
            <h2 style={styles.cityName}>{city}</h2>
        
            <div style={styles.currentWeatherContainer}>
                <h2 style={styles.temperature}>{Math.round(hourlyForecasts[0].main.temp)}°</h2>
                <img
                    src={`http://openweathermap.org/img/wn/${hourlyForecasts[0].weather[0].icon}@2x.png`}
                    alt={hourlyForecasts[0].weather[0].description}
                    style={styles.currentWeatherIcon}
                />
            </div>

            <div style={styles.hourlyForecast}>
                {hourlyForecasts.map((forecast, index) => (
                    <div key={index} style={styles.forecastItem}>
                        <p style={styles.forecastText}>
                            {index === 0 ? formatTime(hour) : formatTime(new Date(forecast.dt_txt).getHours())}
                        </p>
                        <img
                            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                            alt={forecast.weather[0].description}
                            style={styles.weatherIcon}
                        />
                        <p style={styles.forecastText}>{Math.round(forecast.main.temp)}°</p>
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

            <div style={styles.dailyForecastContainer}>
                {weatherData.list
                    .filter((forecast, index) => (index + 1) % 8 === 0)
                    .slice(0, 5)
                    .map((forecast, index) => (
                        <div key={index} style={styles.dailyForecastItem}>
                            <p style={styles.dailyForecastDate}>{formatDate(new Date(forecast.dt_txt))}</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                                alt={forecast.weather[0].description}
                                style={styles.dailyForecastIcon}
                            />
                            <p style={styles.dailyForecastTemp}>{Math.round(forecast.main.temp)}°</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        color: '#ccddf0',
        padding: '0',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflowX: 'hidden',
    },
    cityName: {
        fontSize: '2rem',
        margin: '20px 15% 10px 15%',
        textAlign: 'left',
    },
    currentDate: {
        fontSize: '1.5rem',
        fontWeight: '100',
        margin: '10px 10%',
        color: '#ccddf0',
    },
    currentWeatherContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px 15%',
        overflowX: 'hidden',
    },
    temperature: {
        fontSize: '8rem',
        fontWeight: '900',
        margin: '0',
    },
    hourlyForecast: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '0',
        padding: '0 10%',
        boxSizing: 'border-box',
    },
    forecastItem: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
    },
    forecastText: {
        margin: '0',
        padding: '0',
        fontWeight: '900',
        fontSize: '1rem',
    },
    weatherDetails: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0',
        padding: '0 10%',
        boxSizing: 'border-box',
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
        fontSize: '1.5rem',
        margin: '5px 0',
        fontWeight: 'bold',
    },
    dailyForecastContainer: {
        width: '100%',
        display: 'flex',
        backgroundColor: '#1d1729',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 10%',
        boxSizing: 'border-box',
        marginTop: 'auto',
    },
    dailyForecastItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px',
    },
    dailyForecastDate: {
        fontSize: '1rem',
        margin: '0',
        fontWeight: 'bold',
    },
    dailyForecastIcon: {
        width: '80px',
        height: '80px',
    },
    dailyForecastTemp: {
        fontSize: '1.2rem',
        margin: '0',
    },
    weatherIcon: {
        width: '100px',
        height: '100px',
    },
    currentWeatherIcon: {
        width: '220px',
        height: '220px',
    },
};

const globalStyles = `
    body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default Weather;