/*
* @Author: tyw
* @Date:   2017-03-09 14:55:18
* @Last Modified by:   tyw
* @Last Modified time: 2017-03-09 20:27:10
*/
import {Link} from "react-router"
import React from "react"
import Navlink from "./Navlink"

export default React.createClass({
	render: function() {
		return (
			<div>
				<h2>{this.props.params.repoName}</h2>

				<ul>
					<li><Navlink to="/repos/reactjs/react-router">react-router</Navlink></li>
					<li><Navlink to="/repos/facebook/react">react</Navlink></li>
				</ul>

				{console.log(this.props.children)}

			</div>
		);
	}
})
