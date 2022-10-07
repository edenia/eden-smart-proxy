import React, { useEffect, createContext } from 'react'

import { stateType } from '../@types/context'
import useLightUAL from '../hooks/useUAL'
import { walletConfig } from 'config'

type InitialStateType = {
  user: any
  openMenuWallets: boolean
  elemRef: null
  ual: any
}

const initialValue = {
  user: null,
  openMenuWallets: false,
  elemRef: null,
  ual: null
}

const SharedStateContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({
  state: initialValue,
  dispatch: () => null
})

const sharedStateReducer = (state: stateType, action: any) => {
  switch (action.type) {
    case 'set': {
      return {
        ...state,
        ...action.payload
      }
    }

    case 'setUser':
      return {
        ...state,
        user: action.payload
      }

    case 'ual':
      return {
        ...state,
        ual: action.ual
      }

    case 'setOpenMenuWallets': {
      return {
        ...state,
        elemRef: action.payload,
        openMenuWallets: Boolean(action.payload)
      }
    }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

export const SharedStateProvider: React.FC = ({ children, ...props }: any) => {
  console.log({ walletConfig })
  const ualState = useLightUAL({
    appName: walletConfig.appName,
    chains: walletConfig.network,
    authenticators: walletConfig.authenticators
  })
  const [state, dispatch] = React.useReducer(sharedStateReducer, {
    ...initialValue
  })
  const value = React.useMemo(() => [state, dispatch], [state])

  useEffect(() => {
    const load = async () => {
      dispatch({ type: 'ual', ual: ualState })

      if (!ualState?.activeUser) return

      dispatch({
        type: 'setUser',
        payload: {
          accountName: ualState.activeUser.accountName
        }
      })
    }

    load()
  }, [ualState])

  return (
    <SharedStateContext.Provider value={value} {...props}>
      {children}
    </SharedStateContext.Provider>
  )
}

export const useSharedState = () => {
  const context = React.useContext(SharedStateContext)

  if (!context) {
    throw new Error(`useSharedState must be used within a SharedStateContext`)
  }

  const { state, dispatch } = context
  const setState = (payload: any) => dispatch({ type: 'set', payload })

  const login = (type: string) => {
    state.ual.login(type)
  }
  const logout = () => {
    dispatch({ type: 'logout' })
    state.ual.logout()
  }
  const handleOpenMenu = (event: any) => {
    dispatch({
      type: 'setOpenMenuWallets',
      payload: event.currentTarget
    })
  }
  const handleCloseMenu = () => {
    dispatch({
      type: 'setOpenMenuWallets',
      payload: null
    })
  }

  return [
    state,
    {
      setState,
      login,
      logout,
      handleOpenMenu,
      handleCloseMenu
    }
  ]
}
