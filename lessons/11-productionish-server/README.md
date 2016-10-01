# Production-ish Server

None of this has anything to do with React Router, but since we're
talking about web servers, we might as well take it one step closer to
the real-world. We'll also need it for server rendering in the next
section.

Webpack dev server is not a production server. Let's make a production
server and a little environment-aware script to boot up the right server
depending on the environment.

Firstly, we will need to move a few files around. When in production, we don't want the user to be able to navigate around our root folder and see files such as `package.json`. To combat this, we will create a new public folder and serve everything we want the user to be able to access from there.

1. make a `public` directory.
2. Move `index.html` and `index.css` into it.

We now have to change a few things to work with this new `public` directory.

Let's install a couple modules:

```
npm install express if-env compression --save
```

We'll make use of the handy `if-env` in `package.json`.  Update your
scripts entry in package.json to look like this:

```json
// package.json
"scripts": {
  "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
  "start:dev": "webpack-dev-server --inline --content-base public --history-api-fallback",
  "start:prod": "webpack && node server.js"
},
```
When you run `npm start` it checks if the value of our `NODE_ENV` environment variable is
`production`. If yes, it runs `npm run start:prod`, if not, it runs
`npm run start:dev`. We have also added that the content-base of `start:dev` is the `public` directory that we just created.

In the root directly, open up `webpack.config.js` and add the publicPath '/' as per below:
```
// webpack.config.js
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
```
We have now said a public folder will be the destination folder
of the `bundle.js` file.

Now we're ready to create a production server with Express! Start by adding a new file at root dir called `server.js`:

```js
// server.js
var express = require('express')
var path = require('path')

var app = express()

// serve our static stuff from the public directory
app.use(express.static(path.join(__dirname, 'public')))

// send all requests to public/index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
```

Simple enough, now run:

```sh
NODE_ENV=production npm start
# For Windows users:
# SET "NODE_ENV=production" && npm start
```

Congratulations! You now have a production server for this app!

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
