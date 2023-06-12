/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserRegister, UserSignIn } from '../../models/user';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: UserSignIn, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post<User>(
        `/api/authentication/log-in`,
        { email, password },
        config
      );

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error && error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        }
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unexpected error');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, name, password }: UserRegister, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(
        `/api/authentication/register`,
        { name, email, password },
        config
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error && error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        }
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/log-out',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(`/api/authentication/log-out`, undefined, config);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error && error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        }
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
