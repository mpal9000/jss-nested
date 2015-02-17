## Nested selectors plugin for JSS

This plugin implements nested selectors for [jss](https://github.com/jsstyles/jss).

Take a look at [examples](http://jsstyles.github.io/jss-nested/examples/index.html) directory.

Put an `&` before a selector within a rule and it will be replaced by the parent selector and extracted to a [separate rule](http://jsstyles.github.io/jss-nested/examples/simple/index.html).


```javascript
{
    '.container': {
        padding: '20px',
        // Will result in .container.clear
        '&.clear': {
            clear: 'both'
        },
        // Will result in .container .button
        '& .button': {
            background: 'red'
        },
        '&.selected, &.active': {
            border: '1px solid red'
        },
        '&:hover': {
            background: 'blue'
        }
    }
}
```
```css
.container {
    padding: 20px;
}
.container.clear {
    clear: both;
}
.container .button {
    background: red;
}
.container.selected, .container.active {
    border: 1px solid red;
}
```
## Register plugin

```javascript
var jss = require('jss')
var nested = require('jss-nested')
jss.use(nested)
```

## Run tests

### Locally
```bash
npm i
open test/local.html
```
### From github

[Tests](https://jsstyles.github.com/jss-nested/test)

## License

MIT
