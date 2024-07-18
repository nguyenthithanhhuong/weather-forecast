import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './WeatherModal.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function WeatherModal({ activeDay, onClose }) {
    const city = useSelector(state => state.city);
    const [weatherDetails, setWeatherDetails] = useState(null);

    useEffect(() => {
        const fetchWeatherDetails = () => {
            if (!activeDay || !city) return;

            setWeatherDetails(null); 

            axios.get(`https://api.weatherapi.com/v1/forecast.json?key=f5ac4be4a19c47d8a3e42522222112&q=${city}&days=3&aqi=no&alerts=no`)
                .then(response => {
                    const forecastDay = response.data.forecast.forecastday.find(day => day.date === activeDay.date);
                    setWeatherDetails(forecastDay);
                })
                .catch(() => {
                    alert('Failed to fetch weather details.');
                })
        };

        fetchWeatherDetails();
    }, [activeDay, city]);

    if (!activeDay) return null;

    return (
        <div className={cx('modal-box')}>
            <div className={cx('modal-body')}>
                <div className={cx('modal-heading')}>
                    <div className={cx('modal-heading__city')}>
                        {city.charAt(0).toUpperCase() + city.slice(1)}
                    </div>
                    <div className={cx('modal-heading__date')}>
                        {new Date(activeDay.date).toLocaleDateString()}
                    </div>
                    <div className={cx('modal-heading__icon')} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </div>
                </div>
                <div className={cx('modal-content')}>
                    {weatherDetails && (
                        <div className={cx('row')}>
                            <div className={cx('col')}>
                                <div><strong>Max Degree:</strong> {weatherDetails.day.maxtemp_c} °C</div>
                                <div><strong>Min Degree:</strong> {weatherDetails.day.mintemp_c} °C</div>
                                <div><strong>Avg Degree:</strong> {weatherDetails.day.avgtemp_c} °C</div>
                                <div><strong>Humidity:</strong> {weatherDetails.day.avghumidity} %</div>
                            </div>
                            <div className={cx('col')}>
                                <div><strong>Wind Speed:</strong> {weatherDetails.day.maxwind_kph} km/h</div>
                                <div><strong>UV:</strong> {weatherDetails.day.uv} </div>
                                <div><strong>Sunrise:</strong> {weatherDetails.astro.sunrise}</div>
                                <div><strong>Sunset:</strong> {weatherDetails.astro.sunset}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WeatherModal;
