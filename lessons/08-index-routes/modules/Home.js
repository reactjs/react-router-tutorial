import React from 'react'

export default React.createClass({
  render() {
    return <div>Home</div>
    {this.props.children || <Home />}
  }
})