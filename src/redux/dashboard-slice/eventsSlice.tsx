import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../../services/dashboard-services/event-services';

interface NumberOfEvent {
  eventTitle: string;
  totalValue: number;
}

interface EventTable {
  links: { rel: string; href: string }[] | null;
  content: { eventName: string; totalValue: number }[] | null;
  page: { size: number; totalElements: number; totalPages: number; number: number } | null;
}

interface ChartEvent {
  time: string;
  eventTitle: string;
  eventValue: number;
}

interface ApiResponse {
  numberOfEvent: NumberOfEvent[] | null;
  eventTable: EventTable | null;
  chartEvent: ChartEvent[] | null;
}

interface EventsState {
  numberOfEvent: NumberOfEvent[] | null;
  eventTable: EventTable | null;
  chartEvent: ChartEvent[] | null;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  numberOfEvent: null,
  eventTable: null,
  chartEvent: null,
  currentPage: 0,
  totalPages: 0,
  pageSize: 6,
  totalElements: 0,
  loading: false,
  error: null,
};

export const fetchEventsThunk = createAsyncThunk<ApiResponse, { pageNum: number; pageSize: number; startDate: string; endDate: string; eventLabel: string }>(
  'events/fetchEvents',
  async ({ pageNum, pageSize, startDate, endDate, eventLabel }) => {
    const response = await fetchEvents(pageNum, pageSize, startDate, endDate, eventLabel);
    return response; 
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCurrentPage (state, action) {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsThunk.fulfilled, (state, action) => {
        const { numberOfEvent, eventTable, chartEvent } = action.payload;
        state.loading = false;

        state.numberOfEvent = numberOfEvent ?? [];
        state.eventTable = eventTable ?? { links: null, content: null, page: null };
        state.chartEvent = chartEvent ?? [];

        if (eventTable?.page) {
          state.currentPage = eventTable.page.number ?? 0;
          state.totalPages = eventTable.page.totalPages ?? 0;
          state.pageSize = eventTable.page.size ?? 0;
          state.totalElements = eventTable.page.totalElements ?? 0;
        } else {
          state.currentPage = 0;
          state.totalPages = 0;
          state.pageSize = 0;
          state.totalElements = 0;
        }
      })
      .addCase(fetchEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});

export const { setCurrentPage } = eventsSlice.actions;
export default eventsSlice.reducer;