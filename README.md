# i18n-to-locfile

Simple converter for "properties"-file type localization files to and from a JSON object. Includes support for arrays 
using ".0" or "$0" notation styles. 

## Usage

Install

```
npm install i18n-to-locfile --save 
```
Or
```
yarn add i18n-to-locfile 
```

And import the exposed methods, or the whole bundle

```
const { flatten, unflatten } = require('i18n-to-locfile');
```

## API

The package exposes 2 methods, one for transforming JSON into a dotted property file, and the other way around. More 
detailed documentation is available [Github Pages](https://arthurjdam.github.io/i18n-to-locfile/).

### Flatten

***flatten(deepObject):flatObject***
```javascript
const { flatten, unflatten } = require('i18n-to-locfile');

const object = {
    hello: 'world',
    address: {
        street: 'somestreet',
        city: 'new york',
    },
    phone: [
        '1-555-1234',
        '1-555-2345',
    ],
};

const flatObject = flatten(object);
console.log(flatObject);
```

Will return:
```
{
    hello: 'world',
    address.street: 'somestreet',
    address.city: 'newyork',
    phone$0: '1-555-1234',
    phone$1: '1-555-2345',
}
```

### Unflatten
***unflatten(flatObject):deepObject***

To go the other way:
```javascript
console.log(unflatten(flatObject));
```

Will return the original object:
```
{
    hello: 'world',
    address: {
        street: 'somestreet',
        city: 'new york',
    },
    phone: [
        '1-555-1234',
        '1-555-2345',
    ],
}
```