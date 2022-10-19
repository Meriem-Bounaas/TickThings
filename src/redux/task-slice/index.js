import { createSlice } from '@reduxjs/toolkit'

export const TaskSlice = createSlice({
  name: 'task',
  initialState: {
    taskList: [],
    editTask: {},
    isEditTAsk: false,
    completed:false,
  },
  reducers: {
    addTask: (state, action) => {
      state.taskList.push({ ...action.payload,completed: JSON.parse(action.payload.completed.toLowerCase())})
    },
    deletTask: (state, action) => {
      state.taskList = state.taskList.filter(task => task.key !== action.payload)
    },
    toggleCompleted: (state, action) => {
      const element = state.taskList.find(e => e.key === action.payload)
      element.completed= !element.completed
    },
    getTaskEditing: (state, action) => {
      state.editTask = state.taskList.find(e => e.key === action.payload)
    },
    isEditTAsk: (state, action) => {
      state.isEditTAsk = action.payload
    },
    changeTask: (state, action) => {
      const task = state.taskList.find(task => task.key === action.payload.key)
      task.title = action.payload.title
      task.description = action.payload.description
      task.date = action.payload.date
      task.importance = action.payload.importance
    },
    clearAllTask: (state, action) =>{
      state.taskList = []
    }
  },
})

export const { addTask, deletTask, toggleCompleted, getTaskEditing, isEditTAsk, changeTask, clearAllTask } = TaskSlice.actions
export default TaskSlice.reducer