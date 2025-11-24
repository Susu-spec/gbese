import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
//   const user = useAppSelector((state) => state.auth.user);
//   const isAuthenticated = !!user;
    const isAuthenticated = true;

    return isAuthenticated ? children : <Navigate to="/" replace />;
}
