import { useSelector } from 'react-redux';
import React from 'react';
import { Line } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import styles from './WeatherChart.module.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const cx = classNames.bind(styles);

function WeatherChart() {
    const activeDay = useSelector(state => state.activeDay);

    if (!activeDay) return <div className={cx('chart')}>No data available</div>;

    const { hour } = activeDay;

    const chartData = {
        labels: hour.map(hour => `${hour.time.split(' ')[1]}`),
        datasets: [
            {
                label: 'Temp(°C)',
                data: hour.map(hour => hour.temp_c),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'UV',
                data: hour.map(hour => hour.uv),
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'Humidity(%)',
                data: hour.map(hour => hour.humidity),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue;
                    }
                }
            }
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className={cx('weather-chart')}>
            <div className={cx('chart-container')}>
                <div className={cx('chart-wrapper')}>
                    <Line data={chartData} options={chartOptions} height={140} width={360} />
                </div>
            </div>
        </div>
    );
}

export default WeatherChart;
