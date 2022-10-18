import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../task-slice/index.js'
import modalReducer from '../modal-slice/index.js'
import formatReducer from '../format-slice/index.js'
import loadingReducer from '../loading-slice/index.js'
import notifyReducer from '../notify-slice/index.js'
 
export const store = configureStore({
  reducer: {
    task: taskReducer,
    modal: modalReducer,
    format: formatReducer,
    loading: loadingReducer,
    notify: notifyReducer,
    
  },
})