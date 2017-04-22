# flexibility-stylus
This is a stylus plugin based on [postcss-flexibility](https://github.com/7rulnik/postcss-flexibility). It might help when you use the flexbox polyfill [Flexibility](https://github.com/jonathantneal/flexibility) and Stylus preprocessor. 

And it simply does this:
> add a `-js-display: flex` declaration before any `display: flex` declarations in your CSS

## Installation
````
npm install --save-dev flexibility-stylus
````

## Usage
You can use it like any other stylus plugins. For example, using the cli:
````
stylus src -o dist -w -u flexibility-stylus 
````
or using it in Node.js

````js
var stylus = require('stylus');
var flex = require('flexibility-stylus');

stylus(css)
  .use(flex())
  .render(function(err, output){
    console.log(output);
  });
````