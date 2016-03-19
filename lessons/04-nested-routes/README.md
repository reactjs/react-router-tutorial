# Nested Routes

The navigation we added to `App` should probably be present on every
screen. Without React Router, we could wrap that `ul` into a
component, say `Nav`, and render a `Nav` on every one of our screens.

This approach isn't as clean as the application grows. React Router
provides another way to share UI like this with nested routes, a trick
it learned from [Ember](http://emberjs.com) (/me tips hat).

## Nested UI and Nested URLs

Have you ever noticed your app is just a series of boxes inside boxes
inside boxes? Have you also noticed your URLs tend to be coupled to that
nesting? For example given this url, `/repos/123`, our
components would probably look like this:

```js
<App>       {/*  /          */}
  <Repos>   {/*  /repos     */}
    <Repo/> {/*  /repos/123 */}
  </Repos>
</App>
```

And our UI something like:

```
         +-------------------------------------+
         | Home Repos About                    | <- App
         +------+------------------------------+
         |      |                              |
Repos -> | repo |  Repo 1                      |
         |      |                              |
         | repo |  Boxes inside boxes          |
         |      |  inside boxes ...            | <- Repo
         | repo |                              |
         |      |                              |
         | repo |                              |
         |      |                              |
         +------+------------------------------+
```

React Router embraces this by letting you nest your routes, which
automatically becomes nested UI.

## Sharing Our Navigation

Lets nest our `About` and `Repos` components inside of `App` so that we
can share the navigation with all screens in the app. We do it in two
steps:

First, let the `App` `Route` have children, and move the other routes
underneath it.

```js
// index.js
// ...
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of `App` */}
      <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
```

Next, render children inside of `App`.

```js
// modules/App.js
// ...
  render() {
    return (
      <div>
        <h1>Ghettohub Issues</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>

        {/* add this */}
        {this.props.children}

      </div>
    )
  }
// ...
```

Alright, now go click the links and notice that the `App` component
continues to render while the child route's component gets swapped
around as `this.props.children` :)

React Router is constructing your UI like this:

```js
// at /about
<App>
  <About/>
</App>

// at /repos
<App>
  <Repos/>
</App>
```

## By Small and Simple Things are Great Things Brought to Pass

The best way to build large things is to stitch small things together.

This is the real power of React Router, every route can be developed
(even rendered!) as an independent application. Your route configuration
stitches all these apps together however you'd like.  Applications
inside of Applications, boxes inside of boxes.

What happens if you move the `About` route outside of `App`?

Okay, now put it back.

---

[Next: Active Links](../05-active-links/)
