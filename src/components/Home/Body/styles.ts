import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing(2, 40, 5, 40)
  },
  spaceTopComponents: {
    paddingTop: theme.spacing(5)
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonPadding: {
    paddingRight: theme.spacing(3)
  }
}))

export default Styles
