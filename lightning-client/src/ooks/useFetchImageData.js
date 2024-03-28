import { useState, useEffect } from 'react';

// @todo currently this has no dependencies and as a result
// I THINK will run on every render? NEED TO CLARIFY THIS 
export default function useFetchImageData() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchImageData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('http://localhost:5000/file-reader');
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.log('error fetching the data: ', error)
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchImageData();
  }, []);

 return { data, isLoading, error };
};
