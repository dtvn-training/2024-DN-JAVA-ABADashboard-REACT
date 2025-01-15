import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchMedias}  from '../../services/dashboard-services/media-services';
import { fetchCampaigns } from '../../services/dashboard-services/campaign-service';

const initialState = {
  dateRange: { startDate: new Date(), endDate: new Date() },
  campaign: '',
  eventname: '',
  media: '',
  medias : [] as { mediumId: string; mediumName: string }[],
  campaigns : [] as { campaignId: string; campaignName: string }[],
  loading : false,
};

export const fetchMediaThunk = createAsyncThunk('mediums/fetchMediums', async () => {
  const response = await fetchMedias();
  return response;
});

export const fetchCampaignsThunk = createAsyncThunk('campaigns/fetchCampaigns', async () => {
  const response = await fetchCampaigns();
  return response;
});


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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMediaThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.medias = action.payload;
      })
      .addCase(fetchCampaignsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload
      });
  },
});

export const { setDateRange, setCampaign, setEventName, setMedia } = filtersSlice.actions;
export default filtersSlice.reducer;