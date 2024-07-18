import { useDispatch } from 'react-redux';
import { setCity } from '../../../redux/slice';
import classNames from 'classnames/bind';
import styles from './InputCity.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function InputCity() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('Hanoi');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            dispatch(setCity(inputValue.trim()));
        }
    };

    return (
        <form className={cx('input-form')} onSubmit={handleFormSubmit}>
            <label className={cx('input-label')}>Your city</label>
            <input 
                type='text' 
                placeholder='Enter city' 
                className={cx('input-box')}
                value={inputValue}
                onChange={handleInputChange}
            />
        </form>
    );
}

export default InputCity;
