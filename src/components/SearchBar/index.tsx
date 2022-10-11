import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

import useStyles from './styles'

type HeadVotersType = {
  setSearchInput(value: any): void
}

const SearchBar: React.FC<HeadVotersType> = ({ setSearchInput }) => {
  const classes = useStyles()

  return (
    <div className={classes.search}>
      <div className={classes.searchIconWrapper}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder='Search by name or account'
        inputProps={{ 'aria-label': 'search' }}
        className={classes.styledInputBase}
        onChange={newValue => setSearchInput(newValue.currentTarget.value)}
      />
    </div>
  )
}

export default SearchBar
