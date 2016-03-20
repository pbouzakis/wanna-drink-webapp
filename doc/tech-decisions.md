# Tech  Decisions.

## App Creation

App was created by using the [88mph Yeoman generator.](https://www.npmjs.com/package/generator-88mph).

`88mph` produced the gulpfile and gave us a gulp tasks that **`browserify`** our js modules, uses the **`babelify`** transform so we can use es2015 syntax. It also gave us the **sass** task for to produce the css.

In addition, `88mph` comes w/ **`react`** which we will use for our view layer.

`88mph` also came w/ the `alt` module, which we are not going to be using. So that was removed from the repo.

## CSS Framework

We have decided to try out [Materialize](http://materializecss.com/). Which is based on [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html).

This should give us good look and feel w/o worrying to much about producing our own designs. It also comes with a grid framework, which we may or may not use.

## Spak!

We are using my (paul) non framework framework spak ;)
This will give the app some structure and standard. We use `spak` to dispatch any actions our UI or system needs.

## fetch
Ajax calls will use the new standard `fetch` api. Since this is might not be available in browsers, we're using githubs polyfil `whatwg-fetch`.

## TraceKit
Since handling `window.onerror` can be a nightmare due to cross browser compatability, we've chose [TraceKit](https://github.com/csnover/TraceKit) to create a consistent error we can rely on for our uncaught error handling.
