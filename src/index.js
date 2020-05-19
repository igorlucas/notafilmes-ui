import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import RegistroFilme from './components/RegistroFilme';
import ListaFilmes from './components/ListaFilmes';
import AvaliacaoFilme from './components/AvaliacaoFilme';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import publicIP from 'react-native-public-ip';

publicIP()
  .then(ip => {
    localStorage.setItem('ip_local', ip);
  })
  .catch(error => {
    console.log(error);
  });

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/registro-filme" component={RegistroFilme} />
      <Route path="/avaliacao-filme" component={AvaliacaoFilme} />
      <Route path="/lista-filmes" component={ListaFilmes} />
    </Switch>
  </ BrowserRouter>
  , document.getElementById('root'));
serviceWorker.register();