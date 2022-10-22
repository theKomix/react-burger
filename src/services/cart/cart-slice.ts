import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { RootState } from '../store';
import {Ingredient} from "../../models/ingredient";

export type CartState = {
  sum: number|null;
  items: CartItem[];
}

export type CartItem = {
  id: string,
  ingredient: Ingredient
}

export const initialState = {sum: null, items: []} as CartState;

function calcSum(ingredients: CartItem[]): number {
  return ingredients.reduce(
      (partialSum, a) => (
          partialSum + a.ingredient.price
      ), 0);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      if (action.payload.type === 'bun') {
        state.items = [
          {id: uuid(), ingredient: action.payload},
          {id: uuid(), ingredient: action.payload},
          ...state.items.filter(x => x.ingredient.type !== 'bun')]
      }
      else {
        state.items.push({id: uuid(), ingredient: action.payload});
      }
      state.sum = calcSum(state.items);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.sum = calcSum(state.items);
    },
    moveIngredient: (state, action: PayloadAction<{id: string, newIndex: number}>) => {
      const newIndex = action.payload.newIndex;
      const item = action.payload.id ? state.items.find(x => x.id === action.payload.id) : state.items[state.items.length - 1];
      const oldIndex = state.items.indexOf(item!);
      state.items.splice(oldIndex, 1);
      state.items.splice(newIndex, 0, item!);
      // state.items = state.items.splice(newIndex, 0, state.items.splice(oldIndex, 1)[0]);
    }
  }
});

export const selectCart = (state: RootState) => state.cart;

export const { addIngredient, removeIngredient, moveIngredient } = cartSlice.actions;
export default cartSlice.reducer;