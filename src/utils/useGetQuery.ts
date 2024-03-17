
import { useState, useEffect } from 'react';


/**
* Hook for fetching data with GET request
* @param query - URL with query params
* @param mapFunction - function that transforms response
*/
export const useGetQuery = <T,>(
  query: string,
  mapFunction: (rawData: any) => T
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(query);
        const json = await response.json();

        setData(mapFunction(json));

        setLoading(false);

      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [mapFunction, query]);
  return { data, loading, error };
};
