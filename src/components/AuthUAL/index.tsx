import React from 'react'
import { Button } from '@edenia/ui-kit'

import useAuthUAL from './useAuthUAL.hook'
import useStyles from './styles'

const AuthButton: React.FC<{ btnLabel: string }> = ({ btnLabel }) => {
  const [{ state }, { login }] = useAuthUAL()
  const classes = useStyles()

  return (
    <div className={classes.loginBtn}>
      {!state?.ual?.activeUser && (
        <Button
          onClick={() => login('anchor')}
          label={btnLabel}
          variant='primary'
        />
      )}
    </div>
  )
}

export default AuthButton
