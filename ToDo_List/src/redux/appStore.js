import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import articleSlice from "./articleSlice";

const presistConfig = {
    key: 'root',
    storage,
    whiteList: ['user','article']
};

const reducer = combineReducers({
    user: userSlice,
    article: articleSlice
});

const presistedReducer = persistReducer(presistConfig, reducer);

const appStore = configureStore({
  reducer:  presistedReducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const presistor = persistStore(appStore);

export default appStore;