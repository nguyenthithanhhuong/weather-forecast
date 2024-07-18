import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'city',
    initialState: 'hanoi',
    reducers: {
        setCity: (state, action) => action.payload,
    },
});

const activeDaySlice = createSlice({
    name: 'activeDay',
    initialState: null,
    reducers: {
        setActiveDay: (state, action) => action.payload,
    },
});

export const { setCity } = slice.actions;
export const { setActiveDay } = activeDaySlice.actions;

export default {
    city: slice.reducer,
    activeDay: activeDaySlice.reducer,
};
