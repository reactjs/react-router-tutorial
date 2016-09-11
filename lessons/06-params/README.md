# URL Params

Consider the following URLs:

```
/repos/reactjs/react-router
/repos/facebook/react
```

These URLs would match a route path like this:

```
/repos/:userName/:repoName
```

The parts that start with `:` are URL parameters whose values will be
parsed out and made available to route components on
`this.props.params[name]`.

## Adding a Route with Parameters

Let's teach our app how to render screens at `/repos/:userName/:repoName`.

First we need a component to render at the route, make a new file at
`modules/Repo.js` that looks something like this:

```js
// modules/Repo.js
import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.params.repoName}</h2>
      </div>
    )
  }
})
```

Now open up `index.js` and add the new route.

```js
// ...
// import Repo
import Repo from './modules/Repo'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/repos" component={Repos}/>
      {/* add the new route */}
      <Route path="/repos/:userName/:repoName" component={Repo}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

Now we can add some links to this new route in `Repos.js`.

```js
// Repos.js
import { Link } from 'react-router'
// ...
export default React.createClass({
  render() {
    return (
      <div>
        <h2>Repos</h2>

        {/* add some links */}
        <ul>
          <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
          <li><Link to="/repos/facebook/react">React</Link></li>
        </ul>

      </div>
    )
  }
})
```

Now go test your links out. Note that the parameter name in the route
`path` becomes the property name in the component. Both `repoName` and
`userName` are available on `this.props.params` of your component. You
should probably add some prop types to help others and yourself out
later.

---

[Next: More Nesting](../07-more-nesting/)
