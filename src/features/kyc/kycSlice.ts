import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
};

const kycSlice = createSlice({
    name: "kyc",
    initialState,
    reducers: {
        completeStep1(state) {
            state.currentStep = Math.max(state.currentStep, 2);
        },
        completeStep2(state) {
            state.currentStep = Math.max(state.currentStep, 3);
        },
        resetKyc(state) {
            state.currentStep = 1;
        }
    }
});

export const { completeStep1, completeStep2, resetKyc } = kycSlice.actions;
export default kycSlice.reducer;
