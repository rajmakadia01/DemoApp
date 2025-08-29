import tasksReducer from './tasksSlice'
import authReducer from './authSlice'
import usersReducer from './usersSlice'
import uiReducer from './uiSlice'
import { configureStore } from '../../node_modules/@reduxjs/toolkit/dist/index'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    users: usersReducer,
    ui: uiReducer,
  },
})

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
