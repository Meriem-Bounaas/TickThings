import { createSlice } from '@reduxjs/toolkit'

export const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    openModal: false
  },
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload
    }
  },
})

export const { setOpenModal } = ModalSlice.actions

export default ModalSlice.reducer