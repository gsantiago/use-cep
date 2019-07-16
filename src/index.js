import { useState, useCallback } from 'react'
import cepPromise from 'cep-promise'

export default function useCep () {
  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const fetch = useCallback(async cep => {
    setLoading(true)

    try {
      const data = await cepPromise(cep)
      setData(data)
      return data
    } catch (err) {
      setError(err)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    data,
    error,
    loading,
    fetch
  }
}
