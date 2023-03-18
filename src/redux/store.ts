import { configureStore} from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/dist/query';
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

setupListeners(store.dispatch);