/*
* @Author: tyw
* @Date:   2017-03-09 18:59:13
* @Last Modified by:   tyw
* @Last Modified time: 2017-03-09 19:01:21
*/

import React from "react"
import {Link} from "react-router"


export default React.createClass({
	render: function() {
		return (
			<Link {...this.props} activeClassName="active"></Link>
		);
	}
})
