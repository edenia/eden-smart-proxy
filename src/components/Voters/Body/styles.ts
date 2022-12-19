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
  },
  selectableItemsBox: { display: 'flex', alignItems: 'center' },
  aStyle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 300,
    textDecoration: 'none',
    paddingLeft: theme.spacing(1)
  }
}))

export default Styles
