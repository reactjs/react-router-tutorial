'use strict';

import React from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink';

export default React.createClass({
  render() {
    return (
    	<div>
    		<p>Hello, repos</p>
    		<div><NavLink to="/">back</NavLink></div>
    		<ul>
          		<li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
          		<li><NavLink to="/repos/facebook/react">React</NavLink></li>
        	</ul>
        	{this.props.children}
    	</div>
    )
  }
});
