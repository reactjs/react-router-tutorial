import React from 'react'
import { render } from 'react-dom'
import App from './modules/App'
import About from './modules/About'
import Repo from './modules/Repo'
import Repos from './modules/Repos'
import Home from './modules/Home'
import { Router, IndexRoute, Route, hashHistory } from 'react-router'

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>, document.getElementById('app')
);