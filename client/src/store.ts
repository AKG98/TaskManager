import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import {tasksApi} from './slices/TasksSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
