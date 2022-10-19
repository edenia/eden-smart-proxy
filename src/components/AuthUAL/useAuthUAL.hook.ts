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
    setState({ validUser: false })
    router.push('/')
  }

  const validateMember = async () => {
    const { rows } = await smartProxyUtil.getEdenMembers(
      state?.ual?.activeUser?.accountName,
      1
    )
    setState({ validUser: true })
    if (!rows.length) {
      handleSignOut()
    }
  }

  useEffect(() => {
    if (!state?.ual?.activeUser?.accountName && state?.validUser) return

    validateMember()

    if (state?.validUser) {
      router.push('/voters')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.ual?.activeUser])

  return [
    { state },
    { handleOpenMenu, handleCloseMenu, handleSignOut, login, setState }
  ]
}

export default useAuthBottonState
