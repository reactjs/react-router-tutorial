# Clean URLs with Browser History

The URLs in our app right now are built on a hack: the hash. Its the
default because it will always work, but there's a better way.

Modern browsers let JavaScript manipulate the URL without making an http
request, so we don't need to rely on the hash (`#`) portion of the url
to do routing, but there's a catch (we'll get to it later).

## Configuring Browser History

Open up `index.js` and import `browserHistory` instead of `hashHistory`.

```js
// index.js
// ...
// bring in `browserHistory` instead of `hashHistory`
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

render((
  <Router history={browserHistory}>
    {/* ... */}
  </Router>
), document.getElementById('app'))
```

Now go click around and admire your clean urls.

Oh yeah, the catch. Click on a link and then refresh your browser. What
happens?

```
Cannot GET /repos
```

## Configuring Your Server

Your server needs to deliver your app no matter what url comes in,
because your app, in the browser, is manipulating the url. Our current
server doesn't know how to handle the URL.

The Webpack Dev Server has an option to enable this. Open up
`package.json` and add `--history-api-fallback`.

```json
    "start": "webpack-dev-server --inline --content-base . --history-api-fallback"
```

We also need to change our relative paths to absolute paths in
`index.html` since the urls will be at deep paths and the app, if it
starts at a deep path, won't be able to find the files.

```html
<!-- index.html -->
<!-- index.css -> /index.css -->
<link rel=stylesheet href=/index.css>

<!-- bundle.js -> /bundle.js -->
<script src="/bundle.js"></script>
```

Stop your server if it's running, then `npm start` again. Look at those
clean urls :)

---

[Next: Production-ish Server](../11-productionish-server/)
