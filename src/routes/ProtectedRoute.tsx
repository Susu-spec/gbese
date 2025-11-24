import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/" replace />;
}
