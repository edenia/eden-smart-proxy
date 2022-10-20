import { useEffect } from 'react'

import { useSharedState } from 'context/state.context'
import { smartProxyUtil } from 'utils'

const useAuthBottonState = (): any => {
  const [state, { login, logout, handleOpenMenu, handleCloseMenu, setState }] =
    useSharedState()

  const handleSignOut = () => {
    logout()
    setState({ validUser: false })
  }

  const validateMember = async () => {
    if (!state?.ual?.activeUser?.accountName) return

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.ual?.activeUser?.accountName])

  return [
    { state },
    { handleOpenMenu, handleCloseMenu, handleSignOut, login, setState }
  ]
}

export default useAuthBottonState
