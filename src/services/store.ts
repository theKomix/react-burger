import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import appReducer from "./app/app-slice";
import userReducer from "./user/user-slice";
import cartReducer from "./cart/cart-slice";
import orderReducer from "./order/order-slice";
import orderFeedReducer, {connect, connecting, disconnect, connected, close, error, message} from "./order-feed/order-feed-slice";
import { createSocketMiddleware } from "./middleware/socket-middleware";

const websocketMiddleware = createSocketMiddleware({connect, connecting, disconnect, connected, close, error, message});

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  orderFeed: orderFeedReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(websocketMiddleware)
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
