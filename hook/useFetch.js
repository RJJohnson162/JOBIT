import { useState, useEffect, useRef } from "react";
import axios from "axios";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const MIN_REQUEST_INTERVAL = 10000; // 10 seconds minimum between requests
const cache = new Map();

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const activeRequest = useRef(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "64c31870efmshf83a97ab12388c3p1a10d4jsnd43c3bc646da",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    const cacheKey = JSON.stringify({ endpoint, query });
    const now = Date.now();

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      setData(cached.data);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      activeRequest.current = controller;
      options.signal = controller.signal;

      console.log(`Making API request to ${endpoint}`, query);
      const response = await axios.request(options);

      if (response.data && response.data.data) {
        cache.set(cacheKey, {
          data: response.data.data,
          timestamp: now,
        });
        setData(response.data.data);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to load data";
        setError(new Error(errorMessage));
        console.error("API Error:", err);
      }
    } finally {
      setIsLoading(false);
      activeRequest.current = null;
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (activeRequest.current) {
        activeRequest.current.abort();
      }
    };
  }, [JSON.stringify(query)]);

  const refetch = () => {
    if (!isLoading) {
      fetchData();
    }
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
