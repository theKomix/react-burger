import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {act} from "react-dom/test-utils";

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export type OrderFeedState = {
  items: OrderFeedItem[];
  total: number;
  totalToday: number;
  status: WebsocketStatus;
  connectionError: string;
}

export interface OrderFeedItem {
  _id: string;
  status: string; //"done" | "";
  number: number;
  createdAt: string;
  updateAt: string;
  ingredients: string[];
}

export const initialState = {
  items: [],
  total: 0,
  totalToday: 0,
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
      state.items = JSON.parse(action.payload).orders;
    }
  }
});

export const selectOrderFeed = (state: RootState) => state.orderFeed;

export const { connect, connecting, disconnect, connected, close, error, message } = orderFeedSlice.actions;

export default orderFeedSlice.reducer;
