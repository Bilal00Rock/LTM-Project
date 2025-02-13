import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const useAxiosPrivate = () => {
    //Uncomment when implement RefreshToken
    //const refresh = useRefreshToken();
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { auth, setAuth } = authContext;

  useEffect(() => {
    //console.log(auth.accessToken);
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //const responseIntercept = axiosPrivate.interceptors.response.use(
    //  (response) => response,
    //  async (error) => {
    //    const prevRequest = error?.config;
    //    if (error?.response?.status === 403 && !prevRequest?.sent) {
    //      prevRequest.sent = true;
    //      const newAccessToken = await refresh();
    //      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    //      return axiosPrivate(prevRequest);
    //    }
    //    return Promise.reject(error);
    //  }
    //);

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      //axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);
  return axiosPrivate;
};

export default useAxiosPrivate;
