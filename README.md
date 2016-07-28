# front-end-react
A simple React to-do-list project that lives entirely on the front end. Comments everywhere. For the purpose of tutoring a friend.

Remember, you can't spell 'front end' without 'frend' :)

Based not a little upon [this](http://codepen.io/pankajparashar/pen/MYzgyW?editors=1000#0).

Uses a mixture of the various syntaxes available (React.createClass, ES6 class, functional component) for demonstration purposes.

This project uses [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html). This means it has to be transpiled into regular JavaScript that the browser can understand. The same goes for the ES6 syntax that is used (const, classes etc.). Babel is used for this transpilation.

To run:
-----
```
git clone https://github.com/gwpmad/front-end-react.git
cd front-end-react
npm install
npm run build
open index.html
```

To develop (with automatic transpilation when src/listMaker.js is saved)
-----
```
node_modules/.bin/babel --watch src/listMaker.js --out-file dist/bundle.js
```
