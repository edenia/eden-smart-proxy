import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

import useStyles from './styles'

const SearchBar: React.FC = () => {
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
      />
    </div>
  )
}

export default SearchBar
