import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2, 1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2)
    }
  },
  centerSelectableItems: {
    display: 'flex',
    alignItems: 'center'
  },
  labelSelectedItems: {
    marginLeft: `${theme.spacing(0.5)} !important`
  },
  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(4)
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    margin: 'auto',
    objectFit: 'cover'
  },
  itemActionStyle: {
    width: '110px'
  }
}))

export default Styles
