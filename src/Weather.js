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
            <h1 style={styles.currentDate}>{currentDate}</h1>
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
                        <p style={styles.forecastText}>{index === 0 ? 'Now' : `${new Date(forecast.dt_txt).getHours()}:00`}</p>
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
                            <p style={styles.dailyForecastDate}>{formatDate(forecast.dt_txt)}</p>
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
    },
    cityName: {
        fontSize: '2rem',
        margin: '5% 10%',
        textAlign: 'left',
    },
    currentDate: {
        fontSize: '1.5rem', 
        fontWeight: '100', 
        margin: '10px 0', 
        color: '#ccddf0', 
    },
    currentWeatherContainer: {
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        margin: '5% 10%',
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
        margin: '20px 0',
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
        margin: '50px 0',
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
        gap: '10px',
    },
    dailyForecastDate: {
        fontSize: '1rem',
        margin: '0',
        fontWeight: 'bold',
    },
    dailyForecastIcon: {
        width: '50px', 
        height: '50px',
    },
    dailyForecastTemp: {
        fontSize: '1.2rem',
        margin: '0',
    },
    weatherIcon: {
        width: '70px', 
        height: '70px',
    },
    currentWeatherIcon: {
        width: '200px', 
        height: '200px',
    },
    '@media (max-width: 440px)': {
        currentWeatherContainer: {
            flexDirection: 'column', 
            alignItems: 'center', 
        },
        temperature: {
            fontSize: '2rem', 
        },
        currentWeatherIcon: {
            width: '100px', 
            height: '100px',
        },
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