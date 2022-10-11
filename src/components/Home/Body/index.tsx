import { Typography } from '@mui/material'
import { Button } from '@edenia/ui-kit'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import AuthButton from '../../AuthUAL'

import useStyles from './styles'

const Body: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation()

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
        <AuthButton />
        <Button
          label={t('home.buttonLabel')}
          variant='secondary'
          onClick={() => router.push('/vote')}
        />
      </div>
    </div>
  )
}

export default Body
