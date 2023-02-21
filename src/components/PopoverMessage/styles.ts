import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  popoverMobile: {
    display: 'flex !important',
    [theme.breakpoints.up('sm')]: {
      display: 'none  !important'
    }
  },
  popoverDesktop: {
    display: 'none !important',
    [theme.breakpoints.up('sm')]: {
      display: 'flex  !important',
      marginLeft: `${theme.spacing(1)} !important`
    }
  },
  popover: {
    border: '1px solid red',
    pointerEvents: 'auto',
    '& .MuiPaper-root': {
      overflow: 'hidden'
    },
    [theme.breakpoints.up('sm')]: {
      pointerEvents: 'none'
    }
  },
  info: {
    fontWeight: '400',
    letterSpacing: '-0.4px',
    fontSize: 16,
    lineHeight: '20px',
    color: '#000000',
    padding: theme.spacing(1)
  }
}))

export default Styles
