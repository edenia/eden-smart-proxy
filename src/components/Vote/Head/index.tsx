import { Dispatch, SetStateAction } from 'react'
import { Typography } from '@mui/material'

import SearchBar from 'components/SearchBar'
import SortComponent from 'components/SortComponent'

import useStyles from './styles'

type HeadVotersType = {
  setSearchInput: Dispatch<SetStateAction<string | undefined>>
}

const Head: React.FC<HeadVotersType> = ({ setSearchInput }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className='titleWrapper'>
        <Typography variant='body1'>
          Select and vote to whitelist your most trusted 21 BPs.
        </Typography>
        <Typography variant='body1'>
          The BP whitelist is sustained by MyvoteEOS. Read more.
        </Typography>
      </div>
      <div className={classes.searchSort}>
        <SearchBar setSearchInput={setSearchInput} />
        <SortComponent />
      </div>
    </div>
  )
}

export default Head
