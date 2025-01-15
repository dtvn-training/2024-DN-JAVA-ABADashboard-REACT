/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  PreviewDataRequest,
  PreviewInterface,
} from "../../services/preview-services/preview-type";
import { GetReportForPreviewByTimestampBetween } from "../../services/preview-services/preview-services";

type InitialState = {
  previewData: PreviewInterface[];
  loading: boolean;
  error: null | string;
};

const initialState: InitialState = {
  previewData: [],
  loading: false,
  error: null,
};

export const getPreviewDataAction = createAsyncThunk<
  PreviewInterface[],
  PreviewDataRequest
>("preview/getPreviewDataAction", async (data: PreviewDataRequest) => {
  try {
    const res = await GetReportForPreviewByTimestampBetween(data);
    return res as PreviewInterface[];
  } catch (err: any) {
    throw new Error(err.message);
  }
});

const PreviewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPreviewDataAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPreviewDataAction.fulfilled,
        (state, action: PayloadAction<PreviewInterface[]>) => {
          state.loading = false;
          state.previewData = action.payload;
        }
      )
      .addCase(getPreviewDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error when get preview data action";
      });
  },
});

export default PreviewSlice.reducer;
