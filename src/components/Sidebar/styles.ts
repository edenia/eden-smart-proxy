import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  sidebarHeader: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 7),
    marginBottom: theme.spacing(1)
  },
  scrollbar: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    margin: '0 4px',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 1, 2, 7)
  },
  navLink: {
    display: 'flex',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    padding: theme.spacing(1),
    margin: `${theme.spacing(1)} !important`,
    textDecoration: 'none',
    '&:hover,&:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.05) !important'
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
    padding: theme.spacing(1, 3, 4, 3)
  },
  centerSelectableItems: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default Styles
