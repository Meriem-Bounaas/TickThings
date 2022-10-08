import { createSlice } from '@reduxjs/toolkit'

export const FormatSlice = createSlice({
  name: 'format',
  initialState: {
    format: "list"
  },
  reducers: {
    setFormat: (state, action) => {
      state.format = action.payload
    }
  },
})

export const { setFormat } = FormatSlice.actions
export default FormatSlice.reducer