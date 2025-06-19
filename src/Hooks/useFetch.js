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
        const res = await api.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        setData(res.data);
      } catch (err) {
        setError("Unauthorized or fetch failed");
        console.error("useFetch error:", err);
      }
      finally{
        setLoading(false )
      }
      
    };

    fetchData();
  }, [endpoint]);

  return { data, error };
};

export default useFetch;
