import { createSlice } from '@reduxjs/toolkit';
// import {fetchMedias}  from '../../services/dashboard-services/media-services';

const initialState = {
  dateRange: { startDate: new Date(), endDate: new Date() },
  campaign: '',
  eventname: '',
  media: '',
  medias : [] as { mediumId: string; mediumName: string }[],
  loading : false,
};

// export const fetchMediaThunk = createAsyncThunk('mediums/fetchMediums', async () => {
//   const response = await fetchMedias();
//   return response;
// });

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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchMediumsThunk.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchMediumsThunk.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.media = action.payload;
  //     });
  // },
});

export const { setDateRange, setCampaign, setEventName, setMedia } = filtersSlice.actions;
export default filtersSlice.reducer;