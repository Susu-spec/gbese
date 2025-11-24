## This is the implementation for the usecase, So I tried to use the auth implementation to show it
- i.e the use of the User profile account details etc, across the dashoard and user profile

This is how to:

Create an auth slice

Dispatch the login result

Access the user anywhere in your dashboard

No counter example, just real auth usage.

Create your Auth Slice
```bash
src/store/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
```

Add the slice to the Redux store
```bash
//src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```


Then wrap your app:
```bash
import { Provider } from "react-redux";
import { store } from "./store/store";

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

Dispatch user data

Your sign-in API:
```bash
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";

function SignIn() {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await fetch("your-api-url", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    // Example API response:
    // { user: { id, name, email }, token: "abcd123" }

    dispatch(setCredentials({
      user: data.user,
      token: data.token
    }));
  };
}
```

Use the auth data in your dashboard

Any file at all:

```bash
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
```

Use Case for Protected route

```bash
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuth) return <Navigate to="/login" />;

  return children;
}
```

// Summary
setCredentials() saves user + token

You dispatch it after login

Dashboard reads it with useSelector

