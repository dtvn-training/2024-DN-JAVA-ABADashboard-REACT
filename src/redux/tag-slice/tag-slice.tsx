import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISuccessResponse } from "../../components/responses-type/response-type";
import {
  GetAllTagsServiceTypes,
  ListTagResponseTypes,
} from "../../services/gtm-config-services/gtm-config-type";
import axios from "axios";
import { GetAllTagsService } from "../../services/gtm-config-services/gtm-config-services";

type InitialStateTypes = {
  Loading: boolean;
  Error: string | null;
  TagList: ListTagResponseTypes;
};

export const GetAllTagsAction = createAsyncThunk<
  ISuccessResponse<ListTagResponseTypes>,
  GetAllTagsServiceTypes
>(
  "GetAllTagsAction",
  async (data: GetAllTagsServiceTypes, { rejectWithValue }) => {
    try {
      const response = await GetAllTagsService(data);
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch all tag"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const initialState: InitialStateTypes = {
  Loading: false,
  Error: null,
  TagList: {
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    totalElements: 0,
    data: [],
  },
};

const TagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllTagsAction.pending, (state) => {
        state.Loading = true;
      })
      .addCase(
        GetAllTagsAction.fulfilled,
        (
          state,
          action: PayloadAction<ISuccessResponse<ListTagResponseTypes>>
        ) => {
          state.Loading = false;
          state.TagList = action.payload.data;
        }
      )
      .addCase(GetAllTagsAction.rejected, (state) => {
        state.Loading = false;
      });
  },
});

export default TagSlice.reducer;
