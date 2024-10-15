import { useCallback, useEffect, useRef, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";


// your API call func

const useFetchData = (url: string, params?: any) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const axoisPrivate = useAxiosPrivate();
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axoisPrivate.get(url, { params: params });

      setData(response.data);
    } catch (error: any) {
      setError(error?.response?.data?.message);
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
