hash.js
========

[![License](http://img.shields.io/:license-mit-blue.svg)](http://tonekk.mit-license.org)
[![Bower version](https://badge.fury.io/bo/hash.js.svg)](http://badge.fury.io/bo/hash.js)

**hash.js** is a super tiny framework to handle your [location.hash](http://www.w3schools.com/jsref/prop_loc_hash.asp)

## Get

```javascript
/*
 *  Given the following url: http://www.example.net/#!&foo=bar&array[]=1&array[]=2
 */
 
hash('foo'); // 'bar'
hash('array'); // ['1', '2']
hash(); // { foo: 'bar', array: ['1', '2'] }
```

## Set

```javascript

// Results in http://www.example.net/#!&foo=bar
hash('foo', 'bar');

// Results in http://www.example.net/#!&foo[]=bar&foo[]=baz
hash('foo', ['bar', 'baz']);

// Results in http://www.example.net/#!
hash('foo', undefined);

```

## Testing

Tests are written using `jasmine` and can be executed in the browser, by browsing `test/index.html`.
This project is too tiny for continuous integration imo.
