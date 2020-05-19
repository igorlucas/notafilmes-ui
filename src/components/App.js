import React from 'react';
//import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="container text-center">
      <div className="app-menu">
        <h1>Menu</h1>
        <h2><Link to="/registro-filme">Cadastrar filme</Link></h2>
        <h2><Link to="/lista-filmes">Listar filmes</Link></h2>
        <h2><Link to="/avaliacao-filme">Avaliar filme</Link></h2>
      </div>
    </div>
  );
}

export default App;
