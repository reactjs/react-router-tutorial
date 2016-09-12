'use strict';

import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';

var NavLink = React.createClass({
  render:function(){
    return (
    	<Link {...this.props} ></Link>
    );
  }
});

export default NavLink;