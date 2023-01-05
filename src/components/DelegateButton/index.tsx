/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Button } from '@edenia/ui-kit'
import { AlertColor } from '@mui/material'

import { smartProxyUtil, eosioUtil } from 'utils'
import { useSharedState } from 'context/state.context'

type MessageObject = {
  message: string
  severity: AlertColor
  visible: boolean
}

type DelegateButtonProps = {
  setMessage(object: MessageObject): void
  buttonStyles?: string
  isMobile?: boolean
  icon?: string
}

const DelegateButton: React.FC<DelegateButtonProps> = ({
  icon,
  isMobile,
  setMessage,
  buttonStyles
}) => {
  const [state, { loginDelegateVote, setState, logout }] = useSharedState()
  const { t } = useTranslation()
  const [showDelegateButton, setShowDelegateButton] = useState<boolean>(true)

  const handleDelegateVote = async () => {
    try {
      if (!state?.ual?.activeUser?.accountName) {
        loginDelegateVote('anchor')
      } else {
        delegateVote()
      }
    } catch (error) {
      setMessage({
        severity: 'error',
        message: t('routes.somethingWrong'),
        visible: true
      })
    }
  }

  const validateHasDelegateVote = async () => {
    const delegateState = await eosioUtil.getVotingState(
      state?.ual?.activeUser?.accountName
    )

    setShowDelegateButton(!(delegateState === eosioUtil.VoteState.ForProxy))
  }

  const delegateVote = async () => {
    try {
      const delegateVoteTrx = smartProxyUtil.buildDelegateTransaction(
        state?.ual?.activeUser?.accountName
      )

      await state?.ual?.activeUser?.signTransaction(delegateVoteTrx, {
        blocksBehind: 3,
        expireSeconds: 1200,
        broadcast: true
      })
      setMessage({
        severity: 'success',
        message: t('routes.successfulVote'),
        visible: true
      })
      setTimeout(async () => {
        await validateHasDelegateVote()
      }, 1500)
    } catch (error) {
      setMessage({
        severity: 'error',
        message: t('routes.somethingWrong'),
        visible: true
      })
    }
  }

  useEffect(() => {
    if (!state?.ual?.activeUser?.accountName) {
      setShowDelegateButton(true)
      return
    }

    validateHasDelegateVote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  useEffect(() => {
    const handleDelegateVote = async () => {
      await delegateVote()
      logout()
      setState({ handleDelegateButton: false })
    }

    if (!state?.ual?.activeUser?.accountName || !state?.handleDelegateButton)
      return

    handleDelegateVote()
  }, [state?.ual?.activeUser, state?.handleDelegateButton])

  return (
    <>
      {showDelegateButton && (
        <Button
          icon={!isMobile ? icon : undefined}
          label={t(!isMobile ? 'buttonLabel' : 'buttonLabelDelegate')}
          variant='primary'
          externalStyles={buttonStyles}
          onClick={() => handleDelegateVote()}
        />
      )}
    </>
  )
}

export default DelegateButton
