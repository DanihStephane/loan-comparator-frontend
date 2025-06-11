import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist"

import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux"

import rootReducers from "./slices/rootReducers";
import persistConfig from "./persistConfig";
const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;