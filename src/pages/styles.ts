import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  containerPage: {
    position: 'relative',
    zIndex: 0
  },
  contentPage: {
    position: 'relative',
    zIndex: 2,
    paddingBottom: theme.spacing(4)
  }
}))

export default Styles
