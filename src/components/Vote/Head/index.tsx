import { Dispatch, SetStateAction } from 'react'
import { Link, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'

import SearchBar from 'components/SearchBar'
import SortComponent from 'components/SortComponent'

import useStyles from './styles'

type HeadVotersType = {
  setSearchInput: Dispatch<SetStateAction<string | undefined>>
  sort: Dispatch<SetStateAction<string>>
}

const Head: React.FC<HeadVotersType> = ({ setSearchInput, sort }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.container}>
      <div className='titleWrapper'>
        <Typography variant='body1'>
          Select and vote to whitelist your most trusted 21 BPs.
        </Typography>
        <Typography variant='body1'>
          The BP whitelist is sustained by MyvoteEOS.{' '}
          <Link
            href='https://myvoteeos.com/home'
            target='_blank'
            rel='noreferrer'
            underline='none'
            color={theme.palette.primary.light}
          >
            Read more
          </Link>
          .
        </Typography>
      </div>
      <div className={classes.searchSort}>
        <SearchBar setSearchInput={setSearchInput} />
        <div className={classes.paddingLeft}>
          <SortComponent sort={sort} />
        </div>
      </div>
    </div>
  )
}

export default Head
