import Image from 'next/image'

import lenguajeIcon from '/public/icons/language-icon.png'

import useStyles from './styles'
import { Typography } from '@mui/material'

const LanguageSelector: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.flexBox}>
      <div className={classes.paddingIcon}>
        <Image src={lenguajeIcon} />
      </div>
      <Typography variant='body1'>Language</Typography>
    </div>
  )
}

export default LanguageSelector
