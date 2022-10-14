import { createSlice } from '@reduxjs/toolkit'

export const NotifySlice = createSlice({
  name: 'notify',
  initialState: {
    notify:"" 
  },
  reducers: {
    isNotify: (state, action) => {
      state.notify = action.payload
    }
  },
})

export const { isNotify } = NotifySlice.actions

export default NotifySlice.reducer