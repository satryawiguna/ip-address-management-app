import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosJwt from "../utils/AxiosJwt";

export const fetchIpAddress = createAsyncThunk("manage/ip", async () => {
  const response = await AxiosJwt.get("/manage/ip");

  return response.data.datas;
});

export const fetchSearchIpAddress = createAsyncThunk(
  "manage/ip/search",
  async (data) => {
    const response = await AxiosJwt.post("/manage/ip/search", data);

    return response.data.datas;
  }
);

export const fetchSearchPageIpAddress = createAsyncThunk(
  "manage/ip/search/page",
  async (data, perPage, page) => {
    const response = await AxiosJwt.get(
      `/manage/ip/search/page/${perPage}/${page}`,
      data
    );

    return response.data.datas;
  }
);

const ipAddressEntity = createEntityAdapter({
  selectId: (ipAddress) => ipAddress.id,
});

const ipAddressSlice = createSlice({
  name: "ipAddress",
  initialState: ipAddressEntity.getInitialState(),
  extraReducers: {
    [fetchIpAddress.fulfilled]: (state, action) => {
      ipAddressEntity.setAll(state, action.payload);
    },
    [fetchSearchIpAddress.fulfilled]: (state, action) => {
      ipAddressEntity.setAll(state, action.payload);
    },
    [fetchSearchPageIpAddress.fulfilled]: (state, action) => {
      ipAddressEntity.setAll(state, action.payload);
    },
  },
});

export const ipAddressSelectors = ipAddressEntity.getSelectors(
  (state) => state.ipAddress
);

export default ipAddressSlice.reducer;
