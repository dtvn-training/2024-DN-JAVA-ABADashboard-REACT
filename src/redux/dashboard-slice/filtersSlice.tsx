import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateRange: { startDate: new Date(), endDate: new Date() },
  campaign: '',
  dimension: '',
  metrics: '',
  media: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDateRange(state, action) {
      state.dateRange = action.payload;
    },
    setCampaign(state, action) {
      state.campaign = action.payload;
    },
    setDimension(state, action) {
      state.dimension = action.payload;
    },
    setMetrics(state, action) {
      state.metrics = action.payload;
    },
    setMedia(state, action) {
      state.media = action.payload;
    },
  },
});

export const { setDateRange, setCampaign, setDimension, setMetrics, setMedia } = filtersSlice.actions;
export default filtersSlice.reducer;