import { makeStyles } from '@mui/styles'

const drawerWidth = 260

const Styles = makeStyles(theme => ({
  wrapperClass: {
    height: '100vh',
    overflowY: 'scroll',
    border: '2px solid red'
  },
  root: {
    display: 'flex',
    height: '100%',
    minHeight: 'fill-available'
    // minHeight: '-webkit-fill-available'
    // minHeight: '-moz-available'
    // backgroundImage: 'url("/bg.png")'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    overflow: 'hidden'
    // paddingTop: theme.spacing(6)
  },
  childContent: {
    flex: 1,
    height: '100%',
    padding: theme.spacing(2),
    overflow: 'scroll'
  }
}))

export default Styles
