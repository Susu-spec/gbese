import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DebtRequest } from "@/features/main/debt-requests/types";

interface DebtRequestsState {
  incoming: DebtRequest[];
}

const initialState: DebtRequestsState = {
  incoming: [],
};

const debtRequestsSlice = createSlice({
  name: "debtRequests",
  initialState,
  reducers: {
    setIncomingDebtRequests(state, action: PayloadAction<DebtRequest[]>) {
      state.incoming = action.payload;
    },
    clearDebtRequests(state) {
      state.incoming = [];
    },
  },
});

export const { setIncomingDebtRequests, clearDebtRequests } = debtRequestsSlice.actions;
export default debtRequestsSlice.reducer;
