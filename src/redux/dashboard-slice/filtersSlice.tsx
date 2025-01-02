import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateRange: { startDate: new Date(), endDate: new Date() },
  campaign: '',
  eventname: '',
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
    setEventName(state, action) {
      state.eventname = action.payload;
    },
    setMedia(state, action) {
      state.media = action.payload;
    },
  },
});

export const { setDateRange, setCampaign, setEventName, setMedia } = filtersSlice.actions;
export default filtersSlice.reducer;