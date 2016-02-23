import React from 'react'
import { Link } from 'react-router'

var NavLink = (props) => (
  <Link {...props} activeClassName="active"/>
)

export default NavLink