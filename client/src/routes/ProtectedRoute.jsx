import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../features/auth/authApi";

const ProtectedRoute = ({ role }) => {
  const { data, isLoading } = useGetProfileQuery();
  console.log(data)

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data?.user) {
    return <Navigate to="/admin-login" replace />;
  }

  if (role && data.user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;