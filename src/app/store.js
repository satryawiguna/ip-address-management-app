import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "../features/authSlice";
import ipAddressReducer from "../features/ipAddressSlice";
import labelReducer from "../features/labelSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  ipAddress: ipAddressReducer,
  label: labelReducer,
});

const persistConfig = {
  key: "KEY",
  storage,
  whiteList: [],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
