import CircularProgress from '@mui/material/CircularProgress'
import { Button } from '@edenia/ui-kit'
import { useState } from 'react'

import useAuthUAL from './useAuthUAL.hook'
import useStyles from './styles'

const AuthButton: React.FC<{ btnLabel: string }> = ({ btnLabel }) => {
  const [{ state }, { login, setState }] = useAuthUAL()
  const [loader, setLoader] = useState<boolean>(false)
  const classes = useStyles()

  const handleLogin = async () => {
    setLoader(true)
    setState({ validUser: true })
    await login('anchor')
  }

  return (
    <div className={classes.loginBtn}>
      {!state?.ual?.activeUser && (
        <Button onClick={handleLogin} label={btnLabel} variant='primary' />
      )}
      <p />
      {loader && <CircularProgress />}
    </div>
  )
}

export default AuthButton
