'use strict';

import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
    	<div>
    		<h1>React Router Tutorial</h1>
    		<ul role="nav">
    			<li>
    				<Link to="/About" activeStyle={{color: 'red'}} style={{color: "#a17ade"}} >About</Link>
    			</li>
    			<li>
    				<Link to="/Repos" activeClassName="active" >Repos</Link>
    			</li>
    		</ul>
    		{this.props.children}
    	</div>
    )
  }
});
