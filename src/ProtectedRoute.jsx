import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
