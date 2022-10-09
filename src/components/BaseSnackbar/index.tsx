import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import Alert, { AlertProps } from '@mui/material/Alert'

import useStyles from './style'

type BaseSnackbarProps = {
  snackbarProps: SnackbarProps
  alertProps?: AlertProps
  message?: string
}

const BaseSnackbar: React.FC<BaseSnackbarProps> = ({
  snackbarProps,
  alertProps,
  message
}: BaseSnackbarProps) => {
  const classes = useStyles()

  return (
    <Snackbar
      className={classes.navbarPosition}
      autoHideDuration={6000}
      {...snackbarProps}
    >
      <Alert elevation={6} variant='filled' severity='error' {...alertProps}>
        {typeof message === 'object' ? JSON.stringify(message) : message}
      </Alert>
    </Snackbar>
  )
}

export default BaseSnackbar
