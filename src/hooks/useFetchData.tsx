import { useCallback, useEffect, useRef, useState } from "react";
import axios from "../api/axios";

// your API call func

const useFetchData = (url: string, params?: any) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url, { params: params });

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);
    useEffect(() => {
      fetchData();
    }, []);
  return { data, error, loading };
};

export default useFetchData;
