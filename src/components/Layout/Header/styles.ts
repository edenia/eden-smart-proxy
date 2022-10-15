import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  appBar: {
    boxShadow: 'none !important',
    color: 'transparent',
    backgroundColor: `${theme.palette.common.white} !important`,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    paddingLeft: 0,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 260
    }
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  topBarStyle: {
    backgroundColor: theme.palette.common.white
  },
  topBarMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 25,
    marginLeft: theme.spacing(2),
    '& .text': {
      fontSize: 20
    }
  },
  bottomBarStyle: {
    minHeight: 57,
    backgroundColor: theme.palette.grey[900],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    padding: theme.spacing(0, 5),
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  bottomBarMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(3),
    gap: theme.spacing(4),
    '& .text': {
      fontSize: 16
    }
  },
  bottomBarButtons: {
    width: 190,
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    padding: theme.spacing(1),
    display: 'flex'
  },
  drawerPaper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1, 5)
    }
  },
  drawerContainer: {
    position: 'absolute',
    right: theme.spacing(1),
    display: 'flex',
    width: '100%',
    height: 80,
    justifyContent: 'space-between'
  },
  drawerShowMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: { display: 'contents' }
  },
  drawerShowDesktop: {
    display: 'contents',
    border: '2px solid black',
    [theme.breakpoints.down('md')]: { display: 'none' }
  },
  drawer: {
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.primary.main
    }
  },
  drawerContent: {
    width: '65vw'
  },
  logoDrawer: {
    margin: theme.spacing(2, 0, 4, 0),
    width: '70%',
    paddingLeft: theme.spacing(1),
    '& img': {
      width: '162px !important',
      height: '37px !important'
    }
  },
  linkGruopBox: {
    margin: theme.spacing(2, 0)
  },
  linkGruopLabel: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    marginLeft: theme.spacing(3),
    color: theme.palette.common.white
  },
  menuIconColor: {
    color: theme.palette.common.black
  },
  buttonLogin: {
    height: 30,
    fontSize: 16,
    color: theme.palette.text.primary
  },
  buttonSignUp: {
    height: 30,
    width: 110,
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    fontSize: 16,
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  linkColor: {
    color: theme.palette.common.white
  },
  languageBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  langItemBox: {
    padding: theme.spacing(0, 0.8)
  },
  languageColor: {
    color: theme.palette.common.white
  },
  divider: {
    borderLeft: `solid 2px ${theme.palette.common.white}`,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 'bold'
    }
  },
  selected: {
    fontWeight: '600'
  },
  leftBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoAppbar: {
    display: 'flex',
    alignItems: 'center'
  },
  logoAndMenu: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  routeLabel: {
    fontWeight: '600',
    fontSize: 30,
    lineHeight: '36px',
    letterSpacing: '-0.0075em',
    color: theme.palette.common.black,
    textTransform: 'capitalize'
  },
  paddingLenguajeSelector: {
    paddingRight: theme.spacing(4)
  },
  btnDelegate: {
    padding: theme.spacing(1, 2)
  }
}))

export default Styles
