import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {GetOrderByNumber, MakeOrder} from './order-api';
import {Ingredient} from "../../models/ingredient";
import {Order} from "../../models/order";

export type OrderState = {
  number: string|null;
  status: 'idle' | 'loading' | 'failed';
  details: Order | null;
  error: string|null;
}

export const initialState = {number: null, status: 'idle', error: null, details: null} as OrderState;

export const makeOrderAsync = createAsyncThunk(
  "order/makeOrder",
  async (order: Ingredient[]) => {
    return await MakeOrder(order);
  }
);

export const getOrderAsync = createAsyncThunk(
    "order/getOrder",
    async (number: string) => {
      return await GetOrderByNumber(number);
    }
)

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrderAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(makeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = "";
        state.number = action.payload.order.number;
      })
      .addCase(makeOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.number = null;
        state.error = action.error.message || "При создании заказа произошла ошибка, перезагрузите страницу...";
      })
      .addCase(getOrderAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.details = null;
      })
      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success && action.payload.orders.length > 0) {
          state.details = action.payload.orders[0];
          state.error = "";
        }
        else {
          state.error = "Заказ не найден";
          state.details = null;
        }
      })
      .addCase(getOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "При получении заказа произошла ошибка, перезагрузите страницу...";
      });
  },
});

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;
