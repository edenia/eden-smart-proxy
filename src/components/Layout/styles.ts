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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    height: 'auto',
    overflow: 'auto',
    justifyContent: 'space-between',
    '& .pageContainer': {
      height: 'auto'
    }
  },
  childContent: {
    flex: 1,
    height: 'auto',
    overflow: 'hidden'
  },
  paddingPage: {
    paddingTop: theme.spacing(6)
  }
}))

export default Styles
