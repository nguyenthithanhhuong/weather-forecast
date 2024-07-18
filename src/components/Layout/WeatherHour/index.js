import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './WeatherHour.module.scss';

const cx = classNames.bind(styles);

function WeatherHour() {
    const activeDay = useSelector(state => state.activeDay);
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        if (activeDay) {
            setForecastData(activeDay.hour);
        }
    }, [activeDay]);

    return (
        <div className={cx('forecast-list')}>
            {forecastData.length === 0 ? (
                <div>No data available for the selected day.</div>
            ) : (
                forecastData.map((hourData, index) => (
                    <div key={index} className={cx('forecast-item')}>
                        <div className={cx('forecast-temp')}>
                            {hourData.temp_c}°C
                        </div>
                        <img 
                            src={hourData.condition.icon} 
                            alt={hourData.condition.text}
                            className={cx('forecast-icon')}
                        />
                        <div className={cx('forecast-hour')}>
                            {hourData.time.split(' ')[1]}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default WeatherHour;
