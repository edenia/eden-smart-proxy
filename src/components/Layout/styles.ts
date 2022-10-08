import { makeStyles } from '@mui/styles'

const drawerWidth = 260

const Styles = makeStyles(theme => ({
  wrapperClass: {
    height: '100vh'
  },
  root: {
    display: 'flex',
    height: '100%',
    minHeight: 'fill-available'
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
    overflow: 'hidden',
    '& .pageContainer': {
      height: '100%'
    }
  },
  childContent: {
    flex: 1,
    height: '100%',
    overflow: 'scroll'
  },
  paddingPage: {
    paddingTop: theme.spacing(6)
  }
}))

export default Styles
