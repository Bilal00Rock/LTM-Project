import axios, { LOGIN_URL } from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const authContext = useAuth();

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { setAuth } = authContext;

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios(LOGIN_URL.logout, {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout