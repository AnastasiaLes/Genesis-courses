import { configureStore} from '@reduxjs/toolkit';
import {coursesListAPI} from './coursesSlice'


export const store = configureStore({
  reducer: {
    [coursesListAPI.reducerPath]: coursesListAPI.reducer,
  },
    middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
     coursesListAPI.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>