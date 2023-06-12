import {
  PreloadedState,
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { recipesApi } from '../services/recipes';
import { reviewsApi } from '../services/reviews';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../services/auth';
// eslint-disable-next-line import/no-cycle

const rootReducer = combineReducers({
  [recipesApi.reducerPath]: recipesApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(recipesApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })
        .concat(recipesApi.middleware)
        .concat(reviewsApi.middleware)
        .concat(authApi.middleware),
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
