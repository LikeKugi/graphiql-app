import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from '@/store/RootReducer';
import { CustomMiddlewares } from '@/store/CustomMiddlewares';

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CustomMiddlewares),
  preloadedState: {},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
