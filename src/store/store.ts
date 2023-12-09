import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import { RootReducer } from '@/store/RootReducer';
import { CustomMiddlewares } from '@/store/CustomMiddlewares';

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(CustomMiddlewares),
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
