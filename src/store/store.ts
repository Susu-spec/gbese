import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from "@/features/auth/authSlice"
import userReducer from "@/features/main/dashboard/userSlice"
import kycReducer from "@/features/kyc/kycSlice"
import { useDispatch, useSelector } from 'react-redux';
import { rememberReducer, rememberEnhancer } from 'redux-remember';

// Persist only reducers that must survive a refresh (e.g., auth, user preferences).
// Do NOT persist server-fetched data, UI state, or anything that changes frequently.
const rememberedKeys = ['auth', 'user', 'kyc']; // Add more slice keys ONLY if their state should persist.

// Combine all reducers here. Only the ones listed in rememberedKeys will be persisted.
const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    kyc: kycReducer
});

const rootReducer = (state: any, action: any) => {
    if (action.type === "RESET_STORE") {
        state = undefined;
    }
    return appReducer(state, action);
};

const store = configureStore({
    reducer: rememberReducer(rootReducer),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
        rememberEnhancer(
            window.localStorage,
            rememberedKeys
        )
    )
});


export const resetStore = () => {
  // remove all redux-remember persisted slices
  rememberedKeys.forEach(key => {
    localStorage.removeItem(`@@remember-${key}`);
  });

  // and reset redux state
  store.dispatch({ type: "RESET_STORE" });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;