import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field } from 'react-final-form'
import useCep from '../../src'

function App (props) {
  const { fetch, loading, error, data } = useCep()

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

ReactDOM.render(
  <App onSubmit={console.log} />,
  document.getElementById('demo')
)
