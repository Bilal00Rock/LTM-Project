import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;
