import React from 'react'
import { render } from 'react-dom'
import App from './modules/App'
import { Router, Route, hashHistory, IndexRoute } from "react-router"
import About from "./modules/About.js"
import Repos from "./modules/Repos.js"
import Home from "./modules/Home"


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
		<IndexRoute component={Home}/>
   		<Route path="/repos" component={Repos}>
	   		<Route path="/repos/:userName/:repoName" component={Repos}/>
	   	</Route>
   		<Route path="/about" component={About}/>
	</Route>
  </Router>
), document.getElementById('app'))
