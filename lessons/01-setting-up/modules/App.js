import React from 'react'
import {Link} from "react-router"
import Navlink from "./Navlink"
import Home from "./Home"




export default React.createClass({
  render() {
    return (
		<div>
			<h1>react router!</h1>
			<ul role="nav">
				<li><Link to="/about" activeStyle={{color:"red"}} activeClassName="active">about</Link></li>
				<li><Link to="/repos" activeStyle={{color:"red"}} activeClassName="active">repos</Link></li>
			</ul>


			{this.props.children || <Home/>}
		</div>
    	)
  }
})
