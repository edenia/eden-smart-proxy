import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3),
    width: '100%'
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
  }
}))

export default Styles
