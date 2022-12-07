import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {OrderList} from "../../models/order-list";

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export type OrderFeedState = {
  orderList: OrderList;
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
    },
    error: (state, action: PayloadAction<string>) => {
      state.status = WebsocketStatus.OFFLINE;
      state.connectionError = action.payload;
    },
    message: (state, action: PayloadAction<string>) =>{
      state.orderList = JSON.parse(action.payload);
    }
  }
});

export const selectOrderList = (state: RootState) => state.orderFeed.orderList;
export const selectStatus = (state: RootState) => state.orderFeed.status;
export const selectError = (state: RootState) => state.orderFeed.connectionError;

export const { connect, connecting, disconnect, connected, close, error, message } = orderFeedSlice.actions;

export default orderFeedSlice.reducer;
