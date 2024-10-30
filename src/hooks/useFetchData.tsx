import { useCallback, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATH_LOGIN } from "../constants";


// your API call func

const useFetchData = (url: string, params?: any) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To handle redirection
  
  const axoisPrivate = useAxiosPrivate();
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axoisPrivate.get(url, { params: params });

      setData(response.data);
    } catch (error: any) {
      
      if (error instanceof AxiosError) {
        if (!error?.response) {
          setError("پاسخی از سرور دریافت نشد");
        } else if (error.response?.status === 403) {
          setError("نشست معتبر نیست، لطفا دوباره وارد شوید");
          navigate(PATH_LOGIN.root, {state: {from: location}, replace: true});
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

export default useFetchData;
