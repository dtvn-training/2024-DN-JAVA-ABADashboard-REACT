import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../../services/dashboard-services/event-services';

interface Event {
  eventId: number;
  eventName: string;
  eventLabel: string;
  eventValue: string;
}

interface EventsState {
  events: Event[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  currentPage: 0,
  totalPages: 0,
  pageSize: 6,
  totalElements: 0,
  loading: false,
  error: null,
};

export const fetchEventsThunk = createAsyncThunk(
  'events/fetchEvents',
  async ({ pageNum, pageSize, startDate, endDate }: { pageNum: number, pageSize: number, startDate: string, endDate: string }) => {
    const response = await fetchEvents(pageNum, pageSize, startDate, endDate);
    return response;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});

export default eventsSlice.reducer;