# Server Rendering

Alright, first things first. Server rendering, at its core is a simple
concept in React.

```js
render(<App/>, domNode)
// can be rendered on the server as
const markup = renderToString(<App/>)
```

It's not rocket science, but it also isn't trivial. First I'm going to
just throw a bunch of webpack shenanigans at you with little
explanation, then we'll talk about the Router.

Since node doesn't (and shouldn't) understand JSX, we need to compile
the code somehow. Using something like `babel/register` is not fit for
production use, so we'll use webpack to build a server bundle, just like
we use it to build a client bundle.

Make a new file called `webpack.server.config.js` and put this stuff in
there:

```js
var fs = require('fs')
var path = require('path')

module.exports = {

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }

}
```

Hopefully some of that makes sense, we aren't going to cover what all of
that stuff does, it's sufficient to say that now we can run our
`server.js` file through webpack and then run it.

Now we need to make some scripts to build server bundle before we try to
run our app.  Update your `package.json` script config to look like
this:

```
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base public/ --history-api-fallback",
  "start:prod": "npm run build && node server.bundle.js",
  "build:client": "webpack",
  "build:server": "webpack --config webpack.server.config.js",
  "build": "npm run build:client && npm run build:server"
},
```

Now when we run `NODE_ENV=production npm start` both the client and
server bundles get created by Webpack.

Okay, let's talk about the Router. We're going to need our routes split
out into a module so that both the client and server entries can require
it. Make a file at `modules/routes` and move your routes and components
into it.

```js
// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
    <Route path="/about" component={About}/>
  </Route>
)
```

```js
// index.js
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import routes and pass them into <Router/>
import routes from './modules/routes'

render(
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('app')
)
```

Now open up `server.js`. We're going to bring in two modules from React
Router to help us render on the server.

If we tried to render a `<Router/>` on the server like we do in the
client, we'd get an empty screen since server rendering is synchronous
and route matching is asynchronous.

Also, most apps will want to use the router to help them load data, so
asynchronous routes or not, you'll want to know what screens are going
to render before you actually render so you can use that information to
load asynchronous data before rendering. We don't have any data loading
in this app, but you'll see where it could happen.

First we import `match` and `RouterContext` from react router, then
we'll match the routes to the url, and finally render.

```js
// ...
// import some new stuff
import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'

// ...

// send all requests to index.html so browserHistory works

app.get('*', (req, res) => {
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is the what `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<RouterContext {...props}/>)

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

And that's it. Now if you run `NODE_ENV=production npm start` and visit
the app, you can view source and see that the server is sending down our
app to the browser. As you click around, you'll notice the client app
has taken over and doesn't make requests to the server for UI. Pretty
cool yeah?!


Our callback to match is a little naive, here's what a production
version would look like:

```js
app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  })
})
```

Server rendering is really new. There aren't really "best practices"
yet, especially when it comes to data loading, so this tutorial is done,
dropping you off at the bleeding edge.

---

[Next: What's Next?](../14-whats-next/)
