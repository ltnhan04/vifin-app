import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { baseApi } from "@/redux/api/baseApi";

import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/category/categorySlice";
import walletReducer from "./features/wallet/walletSlice";
import transactionReducer from "./features/transaction/transactionSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  wallet: walletReducer,
  transaction: transactionReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  // enhancers: (getDefaultEnhancers) =>
  //   getDefaultEnhancers().concat(devToolsEnhancer()),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { warnAfter: 100 },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
