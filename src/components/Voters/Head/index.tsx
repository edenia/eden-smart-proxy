import { Dispatch, SetStateAction } from 'react'
import { Typography } from '@mui/material'

import SearchBar from 'components/SearchBar'

import useStyles from './styles'

type HeadVotersType = {
  setSearchInput: Dispatch<SetStateAction<string | undefined>>
}

const Head: React.FC<HeadVotersType> = ({ setSearchInput }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className='titleWrapper'>
        <Typography variant='body1'>Voting members and delegates.</Typography>
        <Typography variant='body1'>
          Last election on October 8, 2022.
        </Typography>
      </div>
      <div className={classes.search}>
        <SearchBar setSearchInput={setSearchInput} />
      </div>
    </div>
  )
}

export default Head
