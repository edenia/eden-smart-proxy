import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  footerRoot: {
    width: '100%',
    backgroundColor: theme.palette.grey[600],
    '& .footer-item-style': {
      color: 'rgba(163,163,163,1) !important',
      fontSize: '16px !important',
      margin: '2px 0'
    },
    '& .footer-item-title': {
      letterSpacing: '.1em',
      fontSize: '.875rem',
      lineHeight: '1.25rem'
    }
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-caption': {
      fontSize: '16px !important'
    }
  },
  paddinR: {
    paddingRight: theme.spacing(0.5)
  }
}))

export default Styles
