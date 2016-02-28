import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'
var Repos = (props) => (
  <div>
    <h2>Repos</h2>
    <ul>
      <li><NavLink to="/repos/rackt/react-router">React Router</NavLink></li>
      <li><NavLink to="/repos/facebook/react">React </NavLink></li>
    </ul>
    {props.children}
  </div>
)

export default Repos