# use-cep

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A React hook for loading CEP data. It uses [`cep-promise`](https://www.npmjs.com/package/cep-promise) under the hood.

## Installation

`npm install use-cep`

`yarn add use-cep`

## Usage

```js
import useCep from 'use-cep'

// Using the hook
const { fetch, loading, error, data } = useCep()
```

Here's an example with `react-final-form`:

```jsx
import React from 'react'
import { Form, Field } from 'react-final-form'
import useCep from 'use-cep'

function App (props) {
  const { query, loading, error, data } = useCep()

  return (
    <Form {...props}>
      {({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name='cep'
            placeholder='CEP'
          >
            {({ input, meta, ...props }) => (
              <input
                {...input}
                {...props}
                onChange={e => {
                  if (e.target.value.length === 8) {
                    fetch(e.target.value).then(data => {
                      form.batch(() => {
                        Object.keys(data).forEach(key => {
                          form.change(key, data[key])
                        })
                      })
                    })
                  }
                  
                  input.onChange(e)
                }}
              />
            )}
          </Field>
          <Field
            name='state'
            component='input'
            placeholder='State'
            disabled={loading}
          />
          <Field
            name='city'
            component='input'
            placeholder='City'
            disabled={loading}
          />
          <Field
            name='neighborhood'
            component='input'
            placeholder='Neighborhood'
            disabled={loading}
          />
        </form>
      )}
    </Form>
  )
}
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
