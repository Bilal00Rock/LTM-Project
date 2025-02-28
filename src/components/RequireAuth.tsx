import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { auth } = authContext;
  //console.log(auth);
  const location = useLocation();
  //console.log(auth)
  //if(auth.user == "Admin")
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login-page" state={{ from: location }} replace />
  );
};

export default RequireAuth;
