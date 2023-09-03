import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { Auth } from 'aws-amplify';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: async (headers) => {
    try {
      const token = (await Auth.currentSession())
        .getAccessToken()
        .getJwtToken();
      headers.set('Authorization', `${token}`);
    } catch (error) {
      //
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    await Auth.currentAuthenticatedUser({ bypassCache: true });
  }
  return result;
};

export default baseQueryWithReauth;
