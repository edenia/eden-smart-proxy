import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSharedState } from 'context/state.context'
import { smartProxyUtil } from 'utils'

const useAuthBottonState = (): any => {
  const [state, { login, logout, handleOpenMenu, handleCloseMenu, setState }] =
    useSharedState()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  const validateMember = async () => {
    const { rows } = await smartProxyUtil.getEdenMembers(
      state?.ual?.activeUser?.accountName,
      1
    )

    if (!rows.length) {
      handleSignOut()
      setState({ validUser: false })
    }
  }

  useEffect(() => {
    if (!state?.ual?.activeUser?.accountName) return

    validateMember()
    router.push('/voters')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.ual?.activeUser, router])

  return [
    { state },
    { handleOpenMenu, handleCloseMenu, handleSignOut, login, setState }
  ]
}

export default useAuthBottonState
