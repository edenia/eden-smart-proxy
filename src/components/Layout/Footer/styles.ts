import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 20),
    width: '100%',
    backgroundColor: theme.palette.grey[600],
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3, 3)
    }
  },
  legend: {
    margin: theme.spacing(4, 0),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  aStyle: {
    textDecoration: 'none',
    color: theme.palette.common.white
  },
  iconStyleMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  iconStyleDesktop: {
    margin: theme.spacing(3, 0),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  socialMediaStyle: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  paddingSocialMedia: {
    paddingTop: theme.spacing(3),
    color: theme.palette.common.white
  },
  socialIcon: {
    fontSize: 60
  },
  whiteColor: {
    color: theme.palette.common.white
  }
}))

export default Styles
