import { axios, REFRESH_URL } from "../api";
import useAuth from "./useAuth"


const useRefreshToken = () => {
    const authContext = useAuth();

    if (!authContext) {
      throw new Error("useContext must be used within an AuthProvider");
    }
  
    const { setAuth } = authContext;
  
    
    const refresh = async () => {
        const response = await axios.get(REFRESH_URL.token, {
            withCredentials : true
        }) ;
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {...prev, accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;