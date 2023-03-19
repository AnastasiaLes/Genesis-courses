import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: '',
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,

    reducers: {
        setToken(state, action: PayloadAction<{ token: string; }>) {
            state.token = action.payload.token;
        }
    },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const persistedAuthReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);


export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;