import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(3, 20),
    width: '100%',
    // border: '2px solid blue',
    backgroundColor: theme.palette.grey[600],
    [theme.breakpoints.down('md')]: {
      // padding: theme.spacing(3, 3)
    }
  }
}))

export default Styles
