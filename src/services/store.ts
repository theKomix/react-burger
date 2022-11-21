import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from "./app/app-slice";
import userReducer from "./user/user-slice";
import cartReducer from "./cart/cart-slice";
import orderReducer from "./order/order-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
