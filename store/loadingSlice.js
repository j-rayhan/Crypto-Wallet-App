import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    app: true,
  },
  reducers: {
    setLoading: (state, { payload }) => ({
      ...state,
      [payload.key]: payload.value,
    }),
  },
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer
