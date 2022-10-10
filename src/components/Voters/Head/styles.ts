import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    width: '100%',
    '& .titleWrapper': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 2, 2, 2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& .titleWrapper': {
        width: 'auto',
        alignItems: 'flex-start;'
      }
    }
  }
}))

export default Styles
