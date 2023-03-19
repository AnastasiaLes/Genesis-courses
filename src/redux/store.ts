import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { persistedAuthReducer } from './authSlice';
import {coursesListAPI} from './coursesSlice'


export const store = configureStore({
  reducer: {
    [coursesListAPI.reducerPath]: coursesListAPI.reducer,
    authSlice: persistedAuthReducer,
  },
    middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
      coursesListAPI.middleware,
  ],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>