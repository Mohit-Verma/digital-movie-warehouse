import {combineReducers, compose, configureStore} from '@reduxjs/toolkit';
import {episodeReducers} from './features';
import {sliceDefitions} from '@/common';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    [sliceDefitions.ESlice.EPISODES]: episodeReducers
});

const store = configureStore({
    reducer: reducers,
    enhancers: composeEnhancers
});

export type TDispatch = typeof store.dispatch;

export {store};
