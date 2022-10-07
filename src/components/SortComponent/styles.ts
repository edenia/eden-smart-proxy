import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 3, 3, 3),
    width: '100%'
  },
  paddingImage: {
    paddingRight: theme.spacing(2)
  }
}))

export default Styles
