import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.grey[600]
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paddinR: {
    paddingRight: theme.spacing(0.5)
  }
}))

export default Styles
