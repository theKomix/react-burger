import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {OrderList} from "../../models/order-list";

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export type OrderListState = Omit<OrderList, 'success' | 'message'>;

export type OrderFeedState = {
  orderList: OrderListState;
  status: WebsocketStatus;
  connectionError: string;
}

export const initialState = {
  orderList: { orders: [], total: 0, totalToday: 0 },
  status: WebsocketStatus.OFFLINE,
  connectionError: ""} as OrderFeedState;

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<{url: string, token: string}>) => {
      state.status = WebsocketStatus.CONNECTING;
      state.connectionError = "";
    },
    connecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    disconnect: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    connected: (state) =>{
      state.status = WebsocketStatus.ONLINE;
    },
    close: (state) =>{
      state.status = WebsocketStatus.OFFLINE;
      state.orderList = { orders: [], total: 0, totalToday: 0 };
    },
    error: (state, action: PayloadAction<string>) => {
      state.status = WebsocketStatus.OFFLINE;
      state.connectionError = action.payload;
      state.orderList = { orders: [], total: 0, totalToday: 0 };
    },
    message: (state, action: PayloadAction<string>) => {
      const response: OrderList = JSON.parse(action.payload);
      if (response.success) {
        state.orderList = response;
        state.orderList.orders = state.orderList.orders.sort((n1,n2) => {
          if (n1.createdAt < n2.createdAt) {
            return 1;
          }

          if (n1.createdAt > n2.createdAt) {
            return -1;
          }

          return 0;
        });
      }
      else {
        state.orderList = { orders: [], total: 0, totalToday: 0 };
      }
    }
  }
});

export const selectOrderList = (state: RootState) => state.orderFeed.orderList;
export const selectStatus = (state: RootState) => state.orderFeed.status;
export const selectError = (state: RootState) => state.orderFeed.connectionError;

export const { connect, connecting, disconnect, connected, close, error, message } = orderFeedSlice.actions;

export default orderFeedSlice.reducer;
