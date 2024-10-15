import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { axoisPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const authContext = useAuth();
  const navigate = useNavigate(); // To handle redirection

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { auth,setAuth } = authContext;
  useEffect(() => {
    const requestIntercept = axoisPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axoisPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axoisPrivate(prevRequest);
          } catch (err: unknown) {
            if (err instanceof AxiosError) {
              if (err?.response?.status === 401) {
                //authContext?.setAuth(null); // Clear auth context
                navigate("/login", {
                  state: { from: prevRequest?.url },
                  replace: true,
                });
              }
            } else {
              Promise.reject(error);
            }
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axoisPrivate.interceptors.response.eject(responseIntercept);
      axoisPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);
  return axoisPrivate;
};

export default useAxiosPrivate;
