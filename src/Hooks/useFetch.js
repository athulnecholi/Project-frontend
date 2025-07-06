import { useEffect, useState } from 'react';
import { api } from '../api/axiosInstance';

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await api.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setData(res.data);
      } catch (err) {
        console.error("useFetch error:", err);

        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          // Remove token but DON'T redirect
          localStorage.removeItem('token');
        } else {
          setError("Failed to fetch data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
