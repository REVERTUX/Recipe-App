/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../models/user';
import { loginUser, logoutUser, registerUser } from './authAction';
import { isLogged, setLogged } from '../../utils/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  isLogged: boolean;
  register: {
    success: boolean;
    error: string | null;
    loading: boolean;
  };
}

const initialState: AuthState = {
  isLogged: isLogged(),
  loading: false,
  user: null,
  error: null,
  success: false,
  register: {
    error: null,
    loading: false,
    success: false,
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
      state.success = true;
    },
    resetRegisterState: (state) => {
      state.register.error = null;
      state.register.loading = false;
      state.register.success = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isLogged = true;
        state.user = payload;
        setLogged(true);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (typeof payload === 'string') {
          state.error = payload;
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.register.loading = false;
        state.register.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.register.loading = false;
        if (typeof payload === 'string') {
          state.register.error = payload;
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.success = false;
        state.loading = false;
        state.isLogged = false;
        setLogged(false);
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.isLogged = false;
        setLogged(false);
      });
  },
});

export const { setCredentials, resetRegisterState } = slice.actions;

export default slice.reducer;
