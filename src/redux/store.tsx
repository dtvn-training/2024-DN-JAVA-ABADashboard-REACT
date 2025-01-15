import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import filtersReducer from './dashboard-slice/filtersSlice';
import eventsReducer from './dashboard-slice/eventsSlice';
import tableFilterReducer from './dashboard-slice/tableFilterSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    events: eventsReducer,
    tableFilter: tableFilterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;