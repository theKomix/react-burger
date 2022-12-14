import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';
import {Ingredient} from "../../models/ingredient";
import {GetIngredients} from "./app-api";

export type AppState = {
  ingredients: Ingredient[];
  error: string;
  status: "idle" | "loading" | "failed";
}

export const initialState = {ingredients: [], ingredientDetails: null, error: "", status: "idle"} as AppState;

export const getIngredientsAsync = createAsyncThunk(
    "app/getIngredients",
    async () => {
      return await GetIngredients();
    }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getIngredientsAsync.pending, (state) => {
          state.status = "loading";
          state.error = "";
        })
        .addCase(getIngredientsAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.error = "";
          state.ingredients = action.payload;
        })
        .addCase(getIngredientsAsync.rejected, (state) => {
          state.status = "failed";
          state.error = "При загрузке ингредиентов произошла ошибка, перезагрузите страницу...";
        });
  },
});

export const selectIngredients = (state: RootState) => state.app.ingredients;
export const selectError = (state: RootState) => state.app.error;
export const selectStatus = (state: RootState) => state.app.status;

export default appSlice.reducer;
