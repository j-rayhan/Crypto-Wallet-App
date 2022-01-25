import {createSlice} from '@reduxjs/toolkit';
import {selectedTheme} from '../constants';

const initialState = {
  appTheme: selectedTheme,
  error: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleThemeBegin: state => ({
      ...state,
      error: null,
    }),
    toggleThemeSuccess: (state, {payload}) => ({
      ...state,
      appTheme: payload.theme,
      error: null,
    }),
    toggleThemeFailure: (state, {payload}) => ({
      ...state,
      error: payload.error,
    }),
  },
});

export const {toggleThemeBegin, toggleThemeSuccess, toggleThemeFailure} =
  themeSlice.actions;
export default themeSlice;
