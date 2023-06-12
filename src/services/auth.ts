/* eslint-disable import/prefer-default-export */
import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '../models/user';
import baseQueryWithReauth from './queryWithReauth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, string>({
      query: () => ({ url: `authentication` }),
    }),
  }),
});

export const { useGetUserProfileQuery } = authApi;
