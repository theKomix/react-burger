import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { MakeOrder } from './order-api';
import {Ingredient} from "../../models/ingredient";

export type OrderState = {
  number: string|null;
  status: 'idle' | 'loading' | 'failed';
  error: string|null;
}

export const initialState = {number: null, status: 'idle', error: null} as OrderState;

export const makeOrderAsync = createAsyncThunk(
  'cart/makeOrder',
  async (order: Ingredient[]) => {
    return await MakeOrder(order);
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrderAsync.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(makeOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = '';
        state.number = action.payload.order.number;
      })
      .addCase(makeOrderAsync.rejected, (state) => {
        state.status = 'failed';
        state.error = 'При создании заказа произошла ошибка, перезагрузите страницу...';
      });
  },
});

export const selectOrder = (state: RootState) => state.order;

export const { resetError } = orderSlice.actions;
export default orderSlice.reducer;