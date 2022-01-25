import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isTradModeVisible: false,
}

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    toggleTab: (state, { payload }) => ({
      ...state,
      isTradModeVisible: payload,
    }),
  },
})

export const { toggleTab } = tabSlice.actions
export default tabSlice
