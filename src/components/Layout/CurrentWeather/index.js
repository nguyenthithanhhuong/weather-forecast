import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './CurrentWeather.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function CurrentWeather() {
    const city = useSelector(state => state.city);
    const [currentTime, setCurrentTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=f5ac4be4a19c47d8a3e42522222112&q=${city}&days=10&aqi=no&alerts=yes`);
                const result = response.data.current;
                const localTime = response.data.location.localtime;
                setWeatherData(result);
                updateCurrentTime(localTime);
                console.log(city);
            } catch (error) {
                alert("Error");
            }
        };

        fetchWeatherData();
    }, [city]);

    const updateCurrentTime = (localTime) => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const dayOfWeeks = [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        ];

        const now = new Date(localTime);
        let hour = now.getHours();
        let meridiem = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        const minute = now.getMinutes().toString().padStart(2, '0');
        const weekDay = dayOfWeeks[now.getDay()];
        const month = months[now.getMonth()];
        const day = now.getDate();
        const year = now.getFullYear();

        const formattedTime = `${hour}:${minute} ${meridiem}, ${weekDay}, ${month} ${day}, ${year}`;
        setCurrentTime(formattedTime);
    };

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('current-time')}>
                {currentTime}
            </div>

            {weatherData && (
                <div className={cx('weather-overview')}>
                    <img 
                        src={weatherData.condition.icon} 
                        alt={weatherData.condition.text}
                        className={cx('weather-icon-box')}
                    />
                    <div className={cx('weather-temperate-box')}>
                        <div className={cx('weather-temperate')}>
                            {Math.round(weatherData.temp_c)}
                        </div>
                        <div className={cx('weather-sign')}>
                            °C
                        </div>
                    </div>
                    <div className={cx('weather-description')}>
                        {weatherData.condition.text}
                    </div>
                </div>
            )}

            {weatherData && (
                <div className={cx('weather-detail')}>
                    <div className={cx('weather-humid')}>
                        <div className={cx('weather-humid__title')}>
                            Humidity
                        </div>
                        <div className={cx('weather-humid__value')}>
                            {weatherData.humidity}%
                        </div>
                    </div>
                    <div className={cx('weather-wind')}>
                        <div className={cx('weather-wind__title')}>
                            Wind speed
                        </div>
                        <div className={cx('weather-wind__value')}>
                            {weatherData.wind_kph} km/h
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CurrentWeather;
