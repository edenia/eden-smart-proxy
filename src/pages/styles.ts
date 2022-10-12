import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  containerPage: {
    position: 'relative',
    zIndex: 0,
    height: '100%'
  },
  contentPage: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      // height: 'calc(100vh - 120px)',
      minHeight: 1000
    }
  },
  backgroundContainer: {
    zIndex: 1
  }
}))

export default Styles
