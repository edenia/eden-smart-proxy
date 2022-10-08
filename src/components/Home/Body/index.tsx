import { Typography } from '@mui/material'
import { Button } from '@edenia/ui-kit'
import clsx from 'clsx'

import AuthButton from '../../AuthUAL'

import useStyles from './styles'

const Body: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant='h1'>Choose Wisely</Typography>
      <Typography variant='h1'> Choose Eden Smart Proxy</Typography>
      <div className={classes.spaceTopComponents}>
        <Typography variant='body1'>
          EdenBPsProxy is a EOS BP voting proxy that maximizes voice of
          individual EOS holders by leveraging their voice with Eden`s fractal
          democracy process. Only members of Edens who revealed their identity
          will be eligible to have a say on the proxy that votes BPs.
        </Typography>
      </div>
      <div
        className={clsx(classes.buttonContainer, classes.spaceTopComponents)}
      >
        <div className={classes.buttonPadding}>
          <AuthButton />
        </div>
        <div className={classes.buttonPadding}>
          <Button label='Delegate Vote' variant='secondary' />
        </div>
      </div>
    </div>
  )
}

export default Body
