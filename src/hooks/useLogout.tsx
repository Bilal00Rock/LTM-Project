import Cookies from "js-cookie";
import axios, { axiosPrivate, LOGIN_URL } from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const authContext = useAuth();

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const {auth, setAuth } = authContext;

    const logout = async () => {
        Cookies.remove('accessToken');
        setAuth({});
        //Implement if Sign Out API is NEEDED
        // try {
        //     const response = await axiosPrivate(LOGIN_URL.logout, {
        //         withCredentials: true
        //     });
        // } catch (err) {
        //     console.error(err);
        // }
    }

    return logout;
}

export default useLogout