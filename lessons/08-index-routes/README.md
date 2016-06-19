# Index Routes

When we visit `/` in this app it's just our navigation and a blank page.
We'd like to render a `Home` component there. Lets create a `Home`
component and then talk about how to render it at `/`.

```js
// modules/Home.js
import React from 'react'

export default React.createClass({
  render() {
    return <div>Home</div>
  }
})
```

One option is to see if we have any children in `App`, and if not,
render `Home`:

```js
// modules/App.js
import Home from './Home'

// ...
<div>
  {/* ... */}
  {this.props.children || <Home/>}
</div>
//...
```

This would work fine, but its likely we'll want `Home` to be attached to
a route like `About` and `Repos` in the future. A few reasons include:

1. Participating in a data fetching abstraction that relies on matched
   routes and their components.
2. Participating in `onEnter` hooks
3. Participating in code-splitting

Also, it just feels good to keep `App` decoupled from `Home` and let the
route config decide what to render as the children. Remember, we want to
build small apps inside small apps, not big ones!

Let's add a new route to `index.js`.

```js
// index.js
// new imports:
// add `IndexRoute` to 'react-router' imports
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
// and the Home component
import Home from './modules/Home'

// ...

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>

      {/* add it here, as a child of `/` */}
      <IndexRoute component={Home}/>

      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

Now open [http://localhost:8080](http://localhost:8080) and you'll see the new component is
rendered.

Notice how the `IndexRoute` has no path. It becomes
`this.props.children` of the parent when no other child of the parent
matches, or in other words, when the parent's route matches exactly.

Index routes can twist people's brains up sometimes. Hopefully it will
sink in with a bit more time. Just think about a web server that looks
for `index.html` when you're at `/`. Same idea, React Router looks for
an index route if a route's path matches exactly.

---

[Next: Index Links](../09-index-links/)
