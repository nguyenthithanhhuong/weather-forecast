import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './WeatherDay.module.scss';
import { setActiveDay } from '../../../redux/slice';
import WeatherModal from '../WeatherModal/index'; 

const cx = classNames.bind(styles);

function WeatherDay() {
    const dispatch = useDispatch();
    const city = useSelector(state => state.city);
    const activeDay = useSelector(state => state.activeDay); 

    const [forecastData, setForecastData] = useState([]);
    const [currentTime, setCurrentTime] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=f5ac4be4a19c47d8a3e42522222112&q=${city}&days=10&aqi=no&alerts=yes`);
                const result = response.data.forecast.forecastday;
                const localTime = response.data.location.localtime;
                setForecastData(result);
                setCurrentTime(localTime);
                dispatch(setActiveDay(result[0]));
                setActiveIndex(0);
            } catch (error) {
                alert("Error");
            }
        };

        fetchWeatherData();
    }, [city, dispatch]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        return `${month} ${day}`;
    };

    const isToday = (dateStr) => {
        const today = new Date(currentTime);
        const date = new Date(dateStr);
        return date.toDateString() === today.toDateString();
    };

    const handleItemClick = (index, day) => {
        setActiveIndex(index);
        dispatch(setActiveDay(day));
    };

    const handleItemDoubleClick = (day) => {
        dispatch(setActiveDay(day));
        setIsModalOpen(true); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    return (
        <div className={cx('forecast-list')}>
            {forecastData.map((day, index) => (
                <div 
                    key={index} 
                    className={cx('forecast-item', { active: index === activeIndex })}
                    onClick={() => handleItemClick(index, day)}
                    onDoubleClick={() => handleItemDoubleClick(day)} 
                >
                    <div className={cx('forecast-date')}>
                        {isToday(day.date) ? 'Today' : formatDate(day.date)}
                    </div>
                    <img 
                        src={day.day.condition.icon} 
                        alt={day.day.condition.text}
                        className={cx('forecast-icon-box')}
                    />
                    <div className={cx('forecast-humid')}>
                        Humidity
                    </div>
                    <div className={cx('forecast-value')}>
                        {day.day.avghumidity}%
                    </div>
                </div>
            ))}
            {isModalOpen && <WeatherModal activeDay={activeDay} onClose={handleCloseModal} />} 
        </div>
    );
}

export default WeatherDay;
