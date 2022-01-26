import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  MARKETS: [],
  COINS: [],
  error: null,
}

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    getHoldingSuccess: (state, { payload }) => ({
      ...state,
      [payload.key]: payload.data,
    }),
    getHoldingFailure: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
})

export const { getHoldingBegin, getHoldingSuccess, getHoldingFailure } = marketSlice.actions
export default marketSlice.reducer
