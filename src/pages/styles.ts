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
    paddingBottom: theme.spacing(4),
    height: '100%'
  },
  backgroundContainer: {
    zIndex: 1
  }
}))

export default Styles
