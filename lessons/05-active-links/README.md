# Active Links

One way that `Link` is different from `a` is that it knows if the path
it links to is active so you can style it differently.

## Active Styles

Let's see how it looks with inline styles, add `activeStyle` to your
`Link`s.

```js
// modules/App.js
<li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
<li><Link to="/repos" activeStyle={{ color: 'red' }}>Repos</Link></li>
```

Now as you navigate, the active link is red.

## Active Class Name

You can also use an active class name instead of inline-styles.

```js
// modules/App.js
<li><Link to="/about" activeClassName="active">About</Link></li>
<li><Link to="/repos" activeClassName="active">Repos</Link></li>
```

We don't have a stylesheet on the page yet though. Lets add one-extra
point if you can add a `link` tag from memory.

```html
// index.html
<link rel="stylesheet" href="index.css" />
```

And the CSS file:

```css
.active {
  color: green;
}
```

You'll need to manually refresh the browser since Webpack isn't building
our `index.html`.

## Nav Link Wrappers

Most links in your site don't need to know they are active, usually just
primary navigation links need to know. It's useful to wrap those so you
don't have to remember what your `activeClassName` or `activeStyle` is
everywhere.

We will use a spread operator here, the three dots. It clones our props
and in this use case it clones `activeClassName` to our desired component for
us to benefit from.

Create a new file at `modules/NavLink.js` that looks like this:

```js
// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})
```

Now you can go change your links to `NavLink`s.

```js
// modules/App.js
import NavLink from './NavLink'

// ...

<li><NavLink to="/about">About</NavLink></li>
<li><NavLink to="/repos">Repos</NavLink></li>
```

Oh, how beautiful upon the renders is the composability of components.

---

[Next: Params](../06-params/)
