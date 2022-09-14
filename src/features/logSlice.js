import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosJwt from "../utils/AxiosJwt";

export const fetchSearchLog = createAsyncThunk(
  "manage/log/search",
  async (data) => {
    const response = await AxiosJwt.post("/manage/log/search", data);

    return response.data.datas;
  }
);

const logEntity = createEntityAdapter({
  selectId: (log) => log.id,
});

const logSlice = createSlice({
  name: "log",
  initialState: logEntity.getInitialState(),
  extraReducers: {
    [fetchSearchLog.fulfilled]: (state, action) => {
      logEntity.setAll(state, action.payload);
    },
  },
});

export const logSelectors = logEntity.getSelectors((state) => state.log);

export default logSlice.reducer;
