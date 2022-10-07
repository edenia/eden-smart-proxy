import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 3, 3, 3),
    width: '100%'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default Styles
