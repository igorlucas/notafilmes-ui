import { useEffect, useState } from 'react';
import listAllFilmes from '../api/listAllFilmes';

export default () => {
  const [filmes, setFilmes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFilmes = () => {
    setIsLoading(true);

    const onSuccess = (response) => {
      setIsLoading(false);
      setFilmes(response.data);
    }

    const onError = (error) => {
      console.error(error);
      setIsLoading(false);
      setError({ message: 'Unable to load all filmes.' });
    }

    listAllFilmes(onSuccess, onError);
  };

  useEffect(() => fetchFilmes(), []);

  return [filmes, isLoading, error, fetchFilmes];
}