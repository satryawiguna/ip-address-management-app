import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import AxiosJwt from "../utils/AxiosJwt";

export const fetchLabel = createAsyncThunk("manage/label", async () => {
  const response = await AxiosJwt.get("/manage/label");

  return response.data.datas;
});

export const fetchSearchLabel = createAsyncThunk(
  "manage/label/search",
  async (data) => {
    const response = await AxiosJwt.post("/manage/label/search", data);

    return response.data.datas;
  }
);

export const fetchSearchPageLabel = createAsyncThunk(
  "manage/label/search/page",
  async (data, perPage, page) => {
    const response = await AxiosJwt.get(
      `/manage/label/search/page/${perPage}/${page}`,
      data
    );

    return response.data.datas;
  }
);

const labelEntity = createEntityAdapter({
  selectId: (label) => label.id,
});

const labelSlice = createSlice({
  name: "label",
  initialState: labelEntity.getInitialState(),
  extraReducers: {
    [fetchLabel.fulfilled]: (state, action) => {
      labelEntity.setAll(state, action.payload);
    },
    [fetchSearchLabel.fulfilled]: (state, action) => {
      labelEntity.setAll(state, action.payload);
    },
    [fetchSearchPageLabel.fulfilled]: (state, action) => {
      labelEntity.setAll(state, action.payload);
    },
  },
});

export const labelSelectors = labelEntity.getSelectors((state) => state.label);

export default labelSlice.reducer;
