import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import messageReducer from '../features/Messages/messageSlice';


const reducers = combineReducers({
    messages: messageReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer
})


export default store;