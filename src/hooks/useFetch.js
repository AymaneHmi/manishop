import { useCallback, useEffect, useState } from "react";

const ApiToken = import.meta.env.VITE_API_TOKEN;

const useFetch = (apiUrl) => {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: encodeURIComponent(ApiToken),
        },
      });
      const responseData = await res.json();
      if (responseData.error) {
        setData(null);
      } else {
        setData(responseData);
      }
    } catch (error) {
      setData(null);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export default useFetch;