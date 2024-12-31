import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import filtersReducer from './dashboard-slice/filtersSlice';
import eventsReducer from './dashboard-slice/eventsSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    events: eventsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: (selector: (state: RootState) => any) => any = useSelector;