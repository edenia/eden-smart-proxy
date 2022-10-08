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
    height: '100%',
    overflow: 'scroll',
    '& .pageContainer': {
      height: 'calc(100% - 224px)',
      minHeight: 'calc(100% - 224px)'
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
