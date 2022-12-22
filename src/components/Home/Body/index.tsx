import { useState, useCallback, useEffect } from 'react'
import { Typography, AlertColor } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Button } from '@edenia/ui-kit'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { BaseSnackbar, DelegateButton } from 'components'
import { useSharedState } from 'context/state.context'
import { homePageConstants } from 'config/constants'
import AuthButton from '../../AuthUAL'

import useStyles from './styles'

type MessageObject = {
  message: string
  severity: AlertColor
  visible: boolean
}

const Body: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation()
  const [state] = useSharedState()
  const [message, setMessage] = useState<MessageObject>({
    message: '',
    severity: 'success',
    visible: false
  })

  const onCloseSnackBar: any = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      setMessage({ ...message, visible: false })
    },
    [message]
  )

  const getDeck = () => {
    return homePageConstants.decks[router.locale || 'en']
  }

  const getAnnouncing = () => {
    return homePageConstants.announcing[router.locale || 'en']
  }

  const downloadFile = async ({ getPDF, fileName }) => {
    const aComponent = document.createElement('a')
    aComponent.setAttribute('download', fileName)
    const href = getPDF
    aComponent.href = href
    aComponent.setAttribute('target', '_blank')
    aComponent.click()
    URL.revokeObjectURL(href)
  }

  useEffect(() => {
    if (!state?.validUser) return

    if (
      !localStorage.getItem('loginUser') ||
      localStorage.getItem('loginUser') === 'false'
    ) {
      localStorage.setItem('loginUser', 'true')
      router.push('/voters')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.validUser])

  return (
    <div className={classes.container}>
      <Typography variant='h1' className='title'>
        {t('home.title.first')}
      </Typography>
      <Typography variant='h1' className='title'>
        {t('home.title.second')}
      </Typography>
      <div className={classes.spaceTopComponents}>
        <Typography variant='body1' className='description'>
          {t('home.description')}
        </Typography>
      </div>
      <div
        className={clsx(classes.buttonContainer, classes.spaceTopComponents)}
      >
        <Button
          onClick={() =>
            downloadFile({
              getPDF: getDeck(),
              fileName: 'Eden Smart-Proxy Deck.pdf'
            })
          }
          label={t('home.viewDeck')}
          variant='secondary'
        />
        <Button
          onClick={() =>
            downloadFile({
              getPDF: getAnnouncing(),
              fileName: 'Announcing Eden Smart-Proxy.pdf'
            })
          }
          label={t('home.whitepaper')}
          variant='secondary'
        />
      </div>
      <div className={clsx(classes.buttonContainer)}>
        {!state?.ual?.activeUser?.accountName || !state?.validUser ? (
          <AuthButton
            setMessage={setMessage}
            btnLabel={t('home.signInLabel')}
          />
        ) : (
          <Button
            onClick={() => router.push('/vote')}
            label={t('home.voteBPs')}
            variant='primary'
          />
        )}
        <DelegateButton setMessage={setMessage} />
      </div>
      <BaseSnackbar
        snackbarProps={{
          open: message.visible,
          onClose: onCloseSnackBar
        }}
        alertProps={{
          severity: message.severity
        }}
        message={message.message}
      />
    </div>
  )
}

export default Body
