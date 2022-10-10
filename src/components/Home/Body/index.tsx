import { Typography } from '@mui/material'
import { Button } from '@edenia/ui-kit'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import AuthButton from '../../AuthUAL'

import useStyles from './styles'

const Body: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.container}>
      <Typography variant='h1' className='title'>
        Choose Wisely
      </Typography>
      <Typography variant='h1' className='title'>
        Choose Eden Smart Proxy
      </Typography>
      <div className={classes.spaceTopComponents}>
        <Typography variant='body1' className='description'>
          EdenBPsProxy is a EOS BP voting proxy that maximizes voice of
          individual EOS holders by leveraging their voice with Eden`s fractal
          democracy process. Only members of Edens who revealed their identity
          will be eligible to have a say on the proxy that votes BPs.
        </Typography>
      </div>
      <div
        className={clsx(classes.buttonContainer, classes.spaceTopComponents)}
      >
        <AuthButton />
        <Button
          label='Delegate Vote'
          variant='secondary'
          onClick={() => router.push('/vote')}
        />
      </div>
    </div>
  )
}

export default Body
