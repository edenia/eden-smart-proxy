import { useState, useCallback } from 'react'
import { Typography, AlertColor } from '@mui/material'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'

import { BaseSnackbar } from 'components'
import AuthButton from '../../AuthUAL'

import useStyles from './styles'

type MessageObject = {
  message: string
  severity: AlertColor
  visible: boolean
}

const Body: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
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
        <AuthButton setMessage={setMessage} btnLabel={t('home.signInLabel')} />
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
