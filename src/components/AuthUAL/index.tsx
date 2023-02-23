import { Button } from '@edenia/ui-kit'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import useAuthUAL from './useAuthUAL.hook'
import useStyles from './styles'

const AuthButton: React.FC<{
  btnLabel: string
  setMessage(value: any): void
}> = ({ btnLabel, setMessage }) => {
  const [{ state }, { login }] = useAuthUAL()
  const { t } = useTranslation()
  const classes = useStyles()

  const handleLogin = async () => {
    await login('anchor')
  }

  useEffect(() => {
    if (state?.validUser === undefined || state?.validUser) return

    setMessage({
      severity: 'warning',
      message: t('home.noEdenMember'),
      visible: true
    })
  }, [setMessage, state?.validUser, t])

  return (
    <div className={classes.loginBtn}>
      {!state?.ual?.activeUser && (
        <Button onClick={handleLogin} label={btnLabel} variant='primary' />
      )}
    </div>
  )
}

export default AuthButton
