import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
//   const user = useAppSelector((state) => state.auth.user);
//   const isAuthenticated = !!user;
    const isAuthenticated = true

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
