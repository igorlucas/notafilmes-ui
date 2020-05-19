import axios from 'axios';
import useListFilmes from '../hooks/useListFilmes';
import React from 'react';
import './ListaFilmes.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

const postAvaliacao = (value, filme_id) => {
    console.log(value);
    console.log(filme_id);
    // axios.post(`http://localhost:8080/avaliacao`, avaliacao)
    //     .then(res => {
    //         console.log(res);
    //     }).catch(error => {
    //         console.log(error);
    //     });
};



const RateAverage = (props) => {
    const { input } = props;
    const [value, setValue] = React.useState(input);
    return (<Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"><b>Média avaliação</b></Typography>
        <Rating
            readOnly
            name="read-only"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
    </Box>)
};

const FilmeItem = (props) => {
    const { filme } = props;
    return (
        <div className="filme_item col-sm-2">
            <p className="text-center"><b>{filme.titulo} ({filme.dataLancamento.split('/')[2]})</b></p>
            <hr />
            <p><RateAverage input={filme.mediaAvaliacao} /></p>
            <p><b>Produtores:</b> {filme.nomesProdutores}</p>
            <p><b>Protagonistas:</b> {filme.nomesProtagonistas}</p>
            <p className="text-justify"><b>Sinopse:</b> {filme.sinopse}</p>
        </div>
    );
}

const ListFilmeTable = (props) => {
    const { filmes } = props;
    let rows = filmes.length / 5;
    return (
        <div className="row">
            {
                filmes.map(filme => <FilmeItem key={filme.id} filme={filme} />)
            }
        </div>
    );
}

const ListaFilmes = () => {
    const [filmes, isLoading, error, fetchFilmes] = useListFilmes();
    return (
        <div className="container">
            <h1 className="text-center">Lista de filmes</h1>
            {
                error ? <Error message={error} /> :
                    (isLoading ? <LoadingMessage /> : <ListFilmeTable filmes={filmes} />)
            }
        </div>
    );
};

export default ListaFilmes;