import { useCallback, useReducer } from 'react'

type State = {
  loading: boolean
  error: null | string
  data: null | Record<string, unknown>
}

type NewState = {
  loading?: boolean
  error?: null | string
  data?: null
}

type UseFetchResponse = {
  loading: boolean
  error: null | string
  data: null | Record<string, unknown>
  fetch(endpoint: string, customConfig?: RequestInit): Promise<void>
}

type useFetchProps = {
  onCompleted?(data: null | Record<string, unknown>): void
  throwError?: boolean
}

const defaultProps: useFetchProps = {
  onCompleted: undefined,
  throwError: true
}

const initialState = {
  loading: false,
  error: null,
  data: null
}

const useFetch = (props: useFetchProps = defaultProps): UseFetchResponse => {
  const { onCompleted, throwError } = { ...defaultProps, ...props }

  const [state, setState] = useReducer(
    (state: State, newState: NewState) => ({ ...state, ...newState }),
    initialState
  )

  const handleFetch = useCallback(
    async (endpoint: string, customConfig: RequestInit): Promise<void> => {
      try {
        setState({
          ...initialState,
          loading: true
        })

        const defaultHeaders: HeadersInit = {
          'content-type': 'application/json'
        }

        const token = ''

        if (token) {
          defaultHeaders.Authorization = `Bearer ${token}`
        }

        const config: RequestInit = {
          method: customConfig?.body ? 'POST' : 'GET',
          ...customConfig,
          headers: {
            ...defaultHeaders,
            ...customConfig?.headers
          }
        }

        if (customConfig?.body) {
          config.body = customConfig.body
        }

        const response = await fetch(endpoint, config)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message)
        }

        setState({
          ...initialState,
          data
        })

        if (onCompleted) {
          onCompleted(data)
        }

        return data
      } catch (e) {
        const error = e as Error

        setState({
          ...initialState,
          error: error?.message
        })

        if (throwError) {
          throw new Error(error?.message)
        }
      }
    },
    [onCompleted, throwError]
  )

  return {
    fetch: handleFetch,
    ...state
  }
}

export default useFetch
