import Button from '@material-ui/core/Button';
import axios from 'axios';
import useListFilmes from '../hooks/useListFilmes';
import React from 'react';
import './ListaFilmes.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import "./AvaliacaoFilme.css";

const LoadingMessage = () => {
  return (
    <p>
      Loading data, please wait...
    </p>
  );
}

const Error = (props) => {
  const { message } = props;
  return (
    <h3>
      {message}
    </h3>
  );
}

const FilmeItem = (props) => {
  const { filme } = props;
  const [nota, setNota] = React.useState(0);
  let ip = localStorage.getItem('ip_local');
  const avaliacao = {ip, comentario:''};
  const name = `${filme.id}`;
  
  const setAvaliacao = (e) =>{
    
    avaliacao[e.name] = e.value;
  }
  
  const postAvaliacao = (data) => {
    avaliacao.nota = data.nota;
    avaliacao.filme_id = data.filme_id;
    console.log(avaliacao);
    axios.post(`http://localhost:8080/avaliacoes`, avaliacao)
      .then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <tr>
      <td>{filme.titulo} ({filme.dataLancamento.split('/')[2]})</td>
      <td><textarea className="form-control" name="comentario" 
      onChange={(e)=>{
        setAvaliacao(e.target)
        }}/></td>
      <td>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            name={name}
            value={nota}
            onChange={(e, new_value) => {
              setNota(new_value);
              postAvaliacao({ filme_id: filme.id, nota: new_value });
            }}
          />
        </Box>
      </td>
    </tr>
  );
}

const ListFilmesTable = (props) => {
  const { filmes } = props;
  return (

    <div className="page container table-responsive">
      <h1 className="text-center">Avaliar filmes</h1>
      <table className="text-left table table-sm" border="1px">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Titulo (Ano)</th>
            <th scope="col">Comentário</th>
            <th scope="col">Nota</th>
          </tr>
        </thead>
        <tbody>
          {
            filmes.map(filme => <FilmeItem key={filme.id} filme={filme} />)
          }
        </tbody>
      </table>
    </div>

  );
}

const AvaliacaoFilme = () => {
  const [filmes, isLoading, error, fetchFilmes] = useListFilmes();
  return (
    <div>
      {/* <button onClick={fetchFilmes}>Refresh</button>
      <br />
      <br /> */}
      {
        error ? <Error message={error} /> :
          (isLoading ? <LoadingMessage /> : <ListFilmesTable filmes={filmes} />)
      }
    </div>
  );
};

export default AvaliacaoFilme;