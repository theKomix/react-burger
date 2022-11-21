import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../store';
import {deleteTokens, saveTokens} from '../utils';
import {AuthGetUser, AuthLoginUser, AuthLogoutUser, AuthRegisterUser} from './user-api';

interface IUser {
    name: string;
    email: string;
}

interface IRegistration {
    name: string;
    email: string;
    password: string;
}

export type UserState = {
    user: IUser | null;
    registration: IRegistration;
    error: string;
    status: "idle" | "loading" | "failed";
}

export const initialState = {user: null, registration: {name: "", email: "", password: ""}, error: "", status: "idle"} as UserState;

export const registerUserAsync = createAsyncThunk(
    "user/registerUser",
    async (user: IRegistration) => {
      return await AuthRegisterUser(user.name, user.email, user.password);
    }
);

export const loginUserAsync = createAsyncThunk(
    "user/loginUser",
    async (user: {email: string, password: string}) => {
        return await AuthLoginUser(user.email, user.password);
    }
);

export const logoutUserAsync = createAsyncThunk(
    "user/logoutUser",
    async () => {
        return await AuthLogoutUser();
    }
);

export const getUserAsync = createAsyncThunk(
    "user/getUser",
    async () => {
        return await AuthGetUser();
    }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      updateRegistrationField: (state, action: PayloadAction<{fieldName: string, fieldValue: string}>) => {
          let fieldName = action.payload.fieldName as keyof IRegistration;
          state.registration[fieldName] = action.payload.fieldValue;
      },
      resetStatus: (state) => {
          state.status = "idle";
      },
      setError: (state, action: PayloadAction<string>) => {
          state.error = action.payload;
      },
  },
  extraReducers: (builder) => {
      builder
          .addCase(registerUserAsync.pending, (state) => {
              state.status = "loading";
              state.error = "";
          })
          .addCase(registerUserAsync.fulfilled, (state, action) => {
              state.status = "idle";
              state.error = "";
              state.user = action.payload.user;
              saveTokens(action.payload.refreshToken, action.payload.accessToken);
          })
          .addCase(registerUserAsync.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message || "Ой! Ошибка, попробуйте заново...";
          })

          .addCase(loginUserAsync.pending, (state) => {
              state.status = "loading";
              state.error = "";
          })
          .addCase(loginUserAsync.fulfilled, (state, action) => {
              state.status = "idle";
              state.error = "";
              state.user = action.payload.user;
              saveTokens(action.payload.refreshToken, action.payload.accessToken);
          })
          .addCase(loginUserAsync.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message || "Ой! Ошибка, попробуйте заново...";
          })

          .addCase(logoutUserAsync.pending, (state) => {
              state.status = "loading";
              state.error = "";
          })
          .addCase(logoutUserAsync.fulfilled, (state) => {
              state.status = "idle";
              state.error = "";
              state.user = null;
              deleteTokens();
          })
          .addCase(logoutUserAsync.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message || "Ой! Ошибка, попробуйте заново...";
          })

          .addCase(getUserAsync.pending, (state) => {
              state.status = "loading";
              state.error = "";
          })
          .addCase(getUserAsync.fulfilled, (state, action) => {
              state.status = "idle";
              state.error = "";
              state.user = action.payload.user;
          })
          .addCase(getUserAsync.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message || "Ой! Ошибка, попробуйте заново...";
          });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectRegistration = (state: RootState) => state.user.registration;
export const selectError = (state: RootState) => state.user.error;
export const selectStatus = (state: RootState) => state.user.status;

export const { updateRegistrationField } = userSlice.actions;
export default userSlice.reducer;
