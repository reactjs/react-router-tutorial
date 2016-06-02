# Production-ish Server

None of this has anything to do with React Router, but since we're
talking about web servers, we might as well take it one step closer to
the real-world. We'll also need it for server rendering in the next
section.

Webpack dev server is not a production server. Let's make a production
server and a little environment-aware script to boot up the right server
depending on the environment.

Let's install a couple modules:

```
npm install express if-env compression --save
```

First, we'll use the handy `if-env` in `package.json`.  Update your
scripts entry in package.json to look like this:

```json
// package.json
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base . --history-api-fallback",
  "start:prod": "webpack && node server.js"
},
```

Now when we run `npm start` it will check if our `NODE_ENV` is
production. If it is, we run `npm run start:prod`, if it's not, we run
`npm run start:dev`.

Now we're ready to create a production server with Express and add a new file at root dir. Here's a
first attempt:

```js
// server.js
var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()

// serve our static stuff like index.css
app.use(express.static(__dirname))

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

Now run:

```sh
NODE_ENV=production npm start
# For Windows users:
# SET NODE_ENV=production npm start
```

Congratulations! You now have a production server for this app. After
clicking around, try navigating to [http://localhost:8080/package.json](http://localhost:8080/package.json).
Whoops.  Let's fix that. We're going to shuffle around a couple files and
update some paths scattered across the app.

1. make a `public` directory.
2. Move `index.html` and `index.css` into it.

Now let's update `server.js` to point to the right directory for static
assets:

```js
// server.js
// ...
// add path.join here
app.use(express.static(path.join(__dirname, 'public')))

// ...
app.get('*', function (req, res) {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
```

We also need to tell webpack to build to this new directory:

```js
// webpack.config.js
// ...
output: {
  path: 'public',
  // ...
}
```

And finally (!) add it to the `--content-base` argument to `npm run start:dev` script:

```json
"start:dev": "webpack-dev-server --inline --content-base public --history-api-fallback",
```

If we had the time in this tutorial, we could use the `WebpackDevServer`
API in a JavaScript file instead of the CLI in an npm script and then
turn this path into config shared across all of these files. But, we're
already on a tangent, so that will have to wait for another time.

Okay, now that we aren't serving up the root of our project as public
files, let's add some code minification to Webpack and gzipping to
express.

```js
// webpack.config.js

// make sure to import this
var webpack = require('webpack')

module.exports = {
  // ...

  // add this handful of plugins that optimize the build
  // when we're in production
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  // ...
}
```

And compression in express:

```js
// server.js
// ...
var compression = require('compression')

var app = express()
// must be first!
app.use(compression())
```

Now go start your server in production mode:

```
NODE_ENV=production npm start
```

You'll see some UglifyJS logging and then in the browser, you can see
the assets are being served with gzip compression.

---

[Next: Navigating](../12-navigating/)
