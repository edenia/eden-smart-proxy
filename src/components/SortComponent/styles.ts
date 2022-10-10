import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: 90,
    margin: theme.spacing(1)
  },
  paddingImage: {
    paddingRight: theme.spacing(1)
  }
}))

export default Styles
