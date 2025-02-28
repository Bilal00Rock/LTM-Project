import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";
import { Loading } from "../pages/Loading/Loading";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  const { auth, setAuth, persist } = authContext;

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        //Uncomment when Refresh Token implemented
        //this checks if refresh token is valid
        // await refresh();
        const token = Cookies.get("accessToken"); // Retrieve the token from the cookie
        const user = Cookies.get("user");
        if (token) {
          setAuth({ accessToken: token, user: user }); // Set auth state with the token from the cookie
          setIsLoading(false);
        } else {
          setIsLoading(false);
          // Optionally, you can redirect to login if no token is found
        }
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    //console.log(auth?.accessToken);
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    if(!persist) {
      Cookies.remove('accessToken');
    }
    return () => {
      isMounted = false;
    };
  }, []);
//test
  //useEffect(() => {
  //  console.log(`isLoading: ${isLoading}`);
  //  console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  //}, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>
  );
};

export default PersistLogin;
