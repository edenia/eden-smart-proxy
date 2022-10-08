import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  loginBtn: {
    fontStyle: 'normal',
    lineHeight: '16px !important',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '1px !important',
    textTransform: 'uppercase',
    color: `${theme.palette.common.white} !important`,
    borderColor: `${theme.palette.common.white} !important`
  },
  menuBox: {
    '& .MuiPaper-root': {
      padding: theme.spacing(1)
    }
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: '6px',
    width: '100%',
    transition: 'all 0.3s ease 0s',
    padding: theme.spacing(0, 1),
    margin: theme.spacing(1, 0),
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1)'
    }
  },
  iconText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& img': {
      marginRight: theme.spacing(1)
    }
  },
  userBtn: {
    textTransform: 'lowercase',
    color: `${theme.palette.common.white} !important`
  }
}))

export default Styles
