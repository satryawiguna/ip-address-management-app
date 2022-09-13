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
  },
});

export const labelSelectors = labelEntity.getSelectors((state) => state.label);

export default labelSlice.reducer;
