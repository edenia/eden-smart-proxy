import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  sidebarHeader: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 0, 3, 2),
    marginBottom: theme.spacing(1)
  },
  scrollbar: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    margin: '0 4px'
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    height: 45,
    padding: theme.spacing(1, 2, 1, 3),
    margin: theme.spacing(1, 0),
    textDecoration: 'none',
    '&:hover,&:active': {
      backgroundColor: 'rgba(103, 80, 164, 0.12)'
    },
    '&.MuiTypography-root': {
      textDecoration: 'none'
    }
  },
  menuLabel: {
    lineHeight: '35px !important',
    letterSpacing: '0.1px !important',
    color: `${theme.palette.text.primary} !important`,
    fontSize: '16px !important'
  },
  icons: {
    display: 'flex',
    minWidth: 56,
    '& svg': {
      color: `${theme.palette.text.primary} !important`
    }
  },
  navLabel: {
    textTransform: 'capitalize',
    textDecoration: 'none',
    fontWeight: '400',
    letterSpacing: '0.44px',
    fontSize: theme.typography.subtitle2.fontSize,
    color: `${theme.palette.text.primary} !important`
  },
  drawer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  footerBox: {
    padding: theme.spacing(1, 3),
    '& span': {
      fontSize: 11,
      textTransform: 'lowercase'
    }
  }
}))

export default Styles
