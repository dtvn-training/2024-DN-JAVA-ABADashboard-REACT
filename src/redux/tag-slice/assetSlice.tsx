import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllTypeTrigger, ListTypeTriggerResponse } from "../../services/gtm-configuration/get-type-trigger";
import { GetAllTypeTriggers } from "../../services/gtm-configuration/trigger-type-services";
import axios from "axios";

interface TagState {
  selectedTagType: string | null;
  widthTypeModal: string;
  triggers: ListTypeTriggerResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  selectedTagType: null,
  widthTypeModal: "40%",
  triggers: null,
  loading: false,
  error: null,
};

// export const fetchTypeTriggers = createAsyncThunk(
//   "asset/fetchTypeTriggers",
//   async (request: GetAllTypeTrigger, { rejectWithValue }) => {
//       const response = await GetAllTypeTriggers(request);
//       return response;
//   }
// );

export const fetchTypeTriggers = createAsyncThunk(
  "fetchTypeTriggers",
  async (data: GetAllTypeTrigger, { rejectWithValue }) => {
    try {
      const response = await GetAllTypeTriggers(data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch all tag"
        );
      }
    }
  }
);

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setSelectedTagType(state, action: PayloadAction<string | null>) {
      state.selectedTagType = action.payload;
    },
    setWidthTypeModal(state, action: PayloadAction<string>) {
      state.widthTypeModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypeTriggers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypeTriggers.fulfilled, (state, action: PayloadAction<ListTypeTriggerResponse>) => {
        state.loading = false;
        state.triggers = action.payload;
      })
    //  .addCase(fetchTypeTriggers.rejected, (state, action: PayloadAction<string | null>) => {
    //   state.loading = false;
    //   state.error = action.payload;
    //   });
  },
});

export const { setSelectedTagType, setWidthTypeModal } = assetSlice.actions;
export default assetSlice.reducer;
