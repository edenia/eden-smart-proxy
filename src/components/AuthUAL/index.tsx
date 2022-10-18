import { Button } from '@edenia/ui-kit'

import useAuthUAL from './useAuthUAL.hook'
import useStyles from './styles'

const AuthButton: React.FC<{ btnLabel: string }> = ({ btnLabel }) => {
  const [{ state }, { login, setState }] = useAuthUAL()
  const classes = useStyles()

  const handleLogin = async () => {
    setState({ validUser: true })
    await login('anchor')
  }

  return (
    <div className={classes.loginBtn}>
      {!state?.ual?.activeUser && (
        <Button onClick={handleLogin} label={btnLabel} variant='primary' />
      )}
    </div>
  )
}

export default AuthButton
