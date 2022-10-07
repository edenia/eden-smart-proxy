import { Typography } from '@mui/material'

import sortIcon from '/public/icons/sort-icon.png'

import useStyles from './styles'
import Image from 'next/image'

const SortComponent: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.paddingImage}>
        <Image src={sortIcon} />
      </div>
      <Typography variant='body2' fontWeight='normal'>
        Sort
      </Typography>
    </div>
  )
}

export default SortComponent
