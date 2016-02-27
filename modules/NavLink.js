var Link = window.ReactRouter.Link;

var NavLink = (props) => (
  <Link {...props} activeClassName="active"/>
)

export default NavLink