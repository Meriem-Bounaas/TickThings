import { createSlice } from '@reduxjs/toolkit'

export const NotifySlice = createSlice({
  name: 'notify',
  initialState: {
    notify:"" ,
    message:""
  },
  reducers: {
    isNotify: (state, action) => {
      state.notify = action.payload
    },
    isMessage: (state, action) => {
      state.message = action.payload
    }
  },
})

export const { isNotify, isMessage } = NotifySlice.actions

export default NotifySlice.reducer