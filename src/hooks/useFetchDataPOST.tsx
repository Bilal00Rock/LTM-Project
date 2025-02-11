import { useCallback, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN } from "../constants";
import { notification } from "antd";
import Cookies from "js-cookie";

// your API call func

const useFetchDataPOST = (url: string, params?: any) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To handle redirection

  const axoisPrivate = useAxiosPrivate();
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axoisPrivate.post(url, { params: params });

      setData(response.data);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (!error?.response) {
          setError("پاسخی از سرور دریافت نشد");
        } else if (error.response?.status === 403) {
          setError("نشست معتبر نیست، لطفا دوباره وارد شوید");
          notification.warning({
            message: "خروج از حساب",
            description: "نشست معتبر نیست، لطفا دوباره وارد شوید",
            duration: 3, // Customize duration as needed
            showProgress: true,
            pauseOnHover: false,
            style: { direction: "rtl", textAlign: "right" }, // Apply RTL styling
            placement: "topLeft", // Place notification on the right
          });
          Cookies.remove('accessToken');
          navigate(PATH_LOGIN.root);
        } else {
          setError(error);
        }
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [axoisPrivate, url, params]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { data, error, loading };
};

export default useFetchDataPOST;
