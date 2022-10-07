import { Typography } from '@mui/material'

import SearchBar from 'components/SearchBar'
import SortComponent from 'components/SortComponent'

import useStyles from './styles'

const Head: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <Typography variant='body1'>
          Select and vote to whitelist your most trusted 21 BPs.
        </Typography>
        <Typography variant='body1'>
          The BP whitelist is sustained by MyvoteEOS. Read more.
        </Typography>
      </div>
      <div className={classes.flex}>
        <SearchBar />
        <SortComponent />
      </div>
    </div>
  )
}

export default Head
