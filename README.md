# TimeToGo #

A simple app where you set a work period per day and when you got in, and it
tells you when it is time to go and how much time untill you can go.

## How to run ##

You will need:

- npm
- bower

First, install the dependencies with `npm` and `bower`:

```
$ npm install
$ bower install
```

Then, run `gulp` tasks to generate CSS and JS files:

```
# Generate CSS and JS files
$ gulp css js
```

After generating CSS and JS files, open the `index.html` file on a browser.

## Gulp Tasks ##

- Generate CSS and JS files
```
$ gulp css js
```

- Remove CSS and JS files
```
$ gulp css-clean js-clean
```

- Generate CSS and JS files and copy the minimum required files to `dist/` folder
```
$ gulp build
```

- Remove CSS and JS files, and DIST folder
```
$ gulp build-clean
```
