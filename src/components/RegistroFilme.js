import React from 'react';
import { useEffect, useState } from 'react';
import './RegistroFilme.css'
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const filme = {};

const handleChange = (event) => {
  const campo = event.target.name;
  const valor = event.target.value;
  filme[campo] = valor;
}

const Mensagem = (props) => {
  const { show } = props;
  const [open, setOpen] = React.useState(true);
  return show ? (<Collapse in={open}>
    <Alert
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      Filme cadastrado com sucesso!
    </Alert>
  </Collapse>
  ) : null;
}

const FormFilme = (props) => {
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const Submit = () => {
    const data = {
      titulo: filme.titulo,
      dataLancamento: filme.dataLancamento,
      nomesProdutores: filme.produtores.split(';'),
      nomesProtagonistas: filme.protagonistas.split(';'),
      sinopse: filme.sinopse
    };

    axios.post(`http://localhost:8080/filmes`, data)
      .then(res => {
        console.log(res);
        setIsSuccessfull(true);
      }).catch(error => {
        console.log(error);
      });
  }
  return (
    <form className="container">
      <h4 className="text-center">Cadastro de filmes</h4>
      <hr />
      <Mensagem show={isSuccessfull} />
      <div className="row">
        <div className="col-sm">
          <input maxLength="50" type="text" className="form-control" name="titulo"
            onChange={e => handleChange(e)}
            placeholder="Título" required />
        </div>
        <div className="col-sm">
          <input type="date" className="form-control"
            onChange={e => handleChange(e)}
            name="dataLancamento"
            placeholder="Data lançamento" required />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <input title="Nome do produtores separados por ';'" type="text" className="form-control"
            onChange={e => handleChange(e)}
            name="produtores" placeholder="Produtores (Ex: John M; Robert Suz)" required />
        </div>
        <div className="col-sm">
          <input title="Nome do protagonistas separados por ';'" type="text" className="form-control"
            onChange={e => handleChange(e)}
            name="protagonistas" placeholder="Protagonistas (EX: Brad Pit; The Rock)" required />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <textarea minLength="50" maxLength="1000" className="form-control"
            onChange={e => handleChange(e)}
            name="sinopse" placeholder="Sinopse" required />
        </div>
        <input type="submit" className="btn btn-primary col-sm-2" value="Cadastrar" onClick={Submit} />
      </div>
      
    </form>
  )

}

const RegistroFilme = () => {
  return (
    <FormFilme />
  );
}

export default RegistroFilme;