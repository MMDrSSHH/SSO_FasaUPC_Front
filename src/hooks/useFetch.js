import { useCallback, useState } from "react";

const useFetch = (apiFunc) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(
    async (...params) => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await apiFunc(...params);

        console.log(res);

        setData(res);
        if (res.hasError) {
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunc]
  );

  return { isError, data, isLoading, fetchData };
};

export default useFetch;
