import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  containerBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  wrapperGrid: {
    paddingBottom: theme.spacing(4),
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: '90%'
    },
    [theme.breakpoints.up('md')]: {
      width: '95%'
    }
  },
  gridRow: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexFlow: 'row wrap'
    }
  },
  gridItem: {
    flexBasis: '100%',
    '-ms-flex': 'auto',
    width: '100%',
    position: 'relative',
    padding: 10,
    boxSizing: 'border-box',
    '& iframe': {
      width: '100% !important'
    },
    [theme.breakpoints.up('sm')]: {
      flexBasis: '50%',
      '& iframe': {
        width: '100% !important'
      }
    }
  },
  twitter: {
    backgroundColor: 'transparent'
  }
}))

export default Styles
