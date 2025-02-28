import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuthAdmin = () => {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { auth ,setPersist} = authContext;
 // setPersist(false);
  console.log(auth);
  const location = useLocation();
  //console.log(auth)
  //if(auth.user == "Admin")
  return (auth?.accessToken && auth.user == "Admin") ? (
    <Outlet /> //Because Admin should be role based and its not Implemented on Backend and Presist Login for Admin is not secure without it 
   //<Navigate to="/admin-login" state={{ from: location }} replace />

  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  );
};

export default RequireAuthAdmin;
