import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  fabPosition: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  },
  centerFabContent: {
    display: 'flex',
    alignItems: 'center'
  },
  labelPadding: {
    paddingLeft: theme.spacing(2)
  },
  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(4)
  }
}))

export default Styles
