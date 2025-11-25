import type { User } from "@/utils/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ 
        user: User; 
        accessToken: string; 
        refreshToken: string }
      >) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    clearUser() {
      return initialState
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
