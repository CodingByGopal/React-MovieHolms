import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const useFetch = (url, timeout) => {
  const [categoryOfUrl, setCategoryOfUrl] = useState("");
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: true,
  });
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const data = await response?.json();

      if (response?.ok && response?.status >= 200 && response?.status < 300) {
        setFetchedData({
          data: data,
          isLoading: false,
        });
      } else {
        setFetchedData({
          data: [],
          isLoading: false,
        });
        navigate("/error-page");
        throw Error("Fetch Error");
      }
    } catch (error) {
      navigate("/error-page");
      console.log(error);
      setFetchedData({
        data: [],
        isLoading: false,
      });
    }
  }, [url, navigate]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      fetchData();
    }, timeout);

    // set category based on url to pass it in different components
    if (url?.includes("tv")) {
      setCategoryOfUrl("tv");
    } else if (url?.includes("movie")) {
      setCategoryOfUrl("movie");
    }
    // clear timer
    return () => {
      clearTimeout(timer1);
    };
  }, [url, fetchData, timeout]);

  const { data, isLoading } = fetchedData;
  return { data, isLoading, categoryOfUrl };
};

export default useFetch;
