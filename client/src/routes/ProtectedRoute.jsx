import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../features/auth/authApi";

const ProtectedRoute = ({ role }) => {
  const token = localStorage.getItem("token");
  const hasValidToken = Boolean(token && token !== "undefined" && token !== "null");
  const { data, isLoading, isError } = useGetProfileQuery(undefined, {
    skip: !hasValidToken,
  });

  if (!hasValidToken) {
    return <Navigate to="/admin-login" replace />;
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !data?.user) {
    localStorage.removeItem("token");
    return <Navigate to="/admin-login" replace />;
  }

  if (role && data.user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;