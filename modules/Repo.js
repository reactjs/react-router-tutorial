import React from 'react'

var Repo = (props) => (
  <div>
    <h2>{props.params.repoName}</h2>
    <h2>{props.params.userName}</h2>
  </div>
)

export default Repo