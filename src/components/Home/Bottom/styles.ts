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
    maxWidth: '100%',
    margin: '0 auto'
  },
  gridRow: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
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
