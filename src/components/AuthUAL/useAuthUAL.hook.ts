import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSharedState } from 'context/state.context'

const useAuthBottonState = (): any => {
  const [state, { login, logout, handleOpenMenu, handleCloseMenu }] =
    useSharedState()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  useEffect(() => {
    if (!state?.ual?.activeUser) return

    console.log('habemus login')
    router.push('/voters')
  }, [state?.ual?.activeUser, router])

  return [{ state }, { handleOpenMenu, handleCloseMenu, handleSignOut, login }]
}

export default useAuthBottonState
