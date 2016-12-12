'use strict';

import React from 'react';
import {Link} from 'react-router';
export default React.createClass({
  render() {
    return (
    	<div>
    		<p>Hello, about</p>
    		<div><Link to="/">back</Link></div>
    	</div>
    )
  }
});
