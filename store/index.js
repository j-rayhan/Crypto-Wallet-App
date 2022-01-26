import {combineReducers, configureStore} from '@reduxjs/toolkit';
import loadingSlice from './loadingSlice';
import marketSlice from './marketSlice';
import tabSlice from './tabSlice';
import themeSlice from './themeSlice';

const rootReducer = combineReducers({
  theme: themeSlice.reducer,
  tab: tabSlice.reducer,
  market: marketSlice,
  loading: loadingSlice
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
