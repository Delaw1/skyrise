import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Switch } from 'react-router-dom'
import history from './shared/_helpers/history'
import IndexRoute from '../src/routes/IndexRoute'

function App() { 
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Switch>
        <IndexRoute /> 
      </Switch>
    </Router> 
  );
}

export default App;
