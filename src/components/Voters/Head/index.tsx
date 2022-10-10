import { Typography } from '@mui/material'

import SearchBar from 'components/SearchBar'

import useStyles from './styles'

const Head: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className='titleWrapper'>
        <Typography variant='body1'>Voting members and delegates.</Typography>
        <Typography variant='body1'>
          Last election on October 8, 2022.
        </Typography>
      </div>
      <SearchBar />
    </div>
  )
}

export default Head
