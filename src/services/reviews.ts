/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListResponse } from '../common/model';
import { Review, ReviewListAPIParams } from '../models/review';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    mode: 'no-cors',
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReview: builder.query<Review, string>({
      query: (id) => ({ url: `reviews/${id}` }),
    }),
    getReviews: builder.query<ListResponse<Review>, ReviewListAPIParams>({
      query: (params) => ({ url: 'reviews', params }),
      providesTags: (result, error, page) =>
        result
          ? [
              // Provides a tag for each post in the current page,
              // as well as the 'PARTIAL-LIST' tag.
              ...result.data.map(({ id }) => ({
                type: 'Reviews' as const,
                id,
              })),
              { type: 'Reviews', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Reviews', id: 'PARTIAL-LIST' }],
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
