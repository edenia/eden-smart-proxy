import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing(2),
    '& .title': {
      fontSize: 41
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
      '& .title': {
        fontSize: 55
      }
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(10),
      '& .title': {
        fontSize: 70
      }
    }
  },
  spaceTopComponents: {
    display: 'flex',
    paddingTop: theme.spacing(4),
    '& .description': {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      '& .description': {
        width: 660
      }
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& button': {
      width: 300,
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      '& button': {
        width: 248,
        margin: theme.spacing(0, 1)
      }
    }
  },
  buttonPadding: {
    paddingRight: theme.spacing(1)
  }
}))

export default Styles
