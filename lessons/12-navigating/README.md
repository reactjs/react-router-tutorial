# Navigating Programatically

While most navigation happens with `Link`, you can programmatically
navigate around an application in response to form submissions, button
clicks, etc.

Let's make a little form in `Repos` that programmatically navigates.

```js
// modules/Repos.js
import React from 'react'
import NavLink from './NavLink'

export default React.createClass({

  // add this method
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    console.log(path)
  },

  render() {
    return (
      <div>
        <h2>Repos</h2>
        <ul>
          <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
          <li><NavLink to="/repos/facebook/react">React</NavLink></li>
          {/* add this form */}
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
```

There are two ways you can do this, the first is simpler than the
second.

First we can use the `browserHistory` singleton that we passed into
`Router` in `index.js` and push a new URL into the history.

```js
// modules/Repos.js
import { browserHistory } from 'react-router'

// ...
  handleSubmit(event) {
    // ...
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },
// ...
```

There's a potential problem with this though. If you pass a different
history to `Router` than you use here, it won't work. It's not very
common to use anything other than `browserHistory`, so this is
acceptable practice. If you're concerned about it, you can make a module
that exports the history you want to use across the app, or...

You can also access the router by wrapping your component with the 
`withRouter` 
[higher-order component](https://facebook.github.io/react/docs/higher-order-components.html),
which will allow you to access the `Router` by passing it to your component in the `props`. 
You can then access the router as `this.props.router`.

```js
// modules/Repos.js
import { withRouter } from 'react-router'

var Repos = React.createClass({

  // ...

  handleSubmit(event) {
    // ...
    this.props.router.push(path)
  },

  // ..
})

var ReposWithRouter = withRouter(Repos);

export default ReposWithRouter;
```

This way you'll be sure to be pushing to whatever history gets passed to
`Router`.

---

[Next: Server Rendering](../13-server-rendering/)
