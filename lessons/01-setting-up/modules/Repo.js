'use strict';

import React from 'react';

class Repo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Repo';
    }
    render() {
        return (
        	<div>
        		<h2>{ this.props.params.repoName}</h2>
        	</div>
    )}
}

export default Repo;
