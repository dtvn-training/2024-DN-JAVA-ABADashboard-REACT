import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    budgetRange: { start: '', end: '' },
    status: '',
    dateRange: { startDate: new Date(), endDate: new Date() },
};

const tableFillterSlice = createSlice({ 
    name: 'tableFillter',
    initialState,
    reducers: {
        setBudgetRange(state, action) {
            state.budgetRange = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setDateRange(state, action) {
            state.dateRange = action.payload;
        },
    },

});

export const { setBudgetRange, setStatus, setDateRange } = tableFillterSlice.actions;
export default tableFillterSlice.reducer;