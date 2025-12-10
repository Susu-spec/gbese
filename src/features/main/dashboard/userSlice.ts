import type { User } from "@/utils/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AccountData } from "./types";

interface UserState {
    profile: User;
    account: AccountData | null;
}

const initialState: UserState = {
    profile: {
        id: "",
        email: "" ,
        full_name: "" ,
        kyc_status: "" ,
        twoFactorRequired: false,
        verificationRequired: true,
        verificationMethods: [""] ,
        first_name: "" ,
        last_name: "" ,
        phone_number: "" ,
        reputation_score: "" ,
        account_status: "" ,
        two_factor_enabled: false,
        created_at: "" ,
        last_login: "" ,
        address: "" ,
        city: "" ,
        state: "" ,
        country: "" ,
        postal_code: "" ,
        date_of_birth: "" ,
        occupation: "" ,
    },
    account: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
        state.profile =  action.payload;
    },
    setAccount(state, action: PayloadAction<AccountData>) {
        state.account = action.payload;
    },
    clearUser() {
      return initialState; 
    }
  }
});

export const { setUser, setAccount, clearUser } = userSlice.actions;
export default userSlice.reducer;