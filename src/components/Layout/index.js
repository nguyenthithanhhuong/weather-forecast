import React, { Fragment } from 'react';
import InputCity from "./InputCity";
import CurrentWeather from "./CurrentWeather";
import WeatherChart from "./WeatherChart";
import WeatherDay from "./WeatherDay";
import WeatherHour from './WeatherHour';
import WeatherModal from './WeatherModal';

function Layout() {
    return (
        <>
            <>
                <InputCity />
                <div className='container'>
                    <CurrentWeather />
                    <div className='content'>
                        <WeatherChart />
                        <WeatherHour />
                        <WeatherDay />
                    </div>
                </div>
            </>
            <WeatherModal />
        </>
    );
}

export default Layout;
