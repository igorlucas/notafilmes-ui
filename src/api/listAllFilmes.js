import axios from 'axios';

const listAllFilmes = (onSuccess, onError) => {
  axios.get('http://localhost:8080/filmes')
  .then(onSuccess)
  .catch(onError);
};
export default listAllFilmes;