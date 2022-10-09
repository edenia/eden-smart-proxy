import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  containerBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    '& .card-container': {
      margin: theme.spacing(1, 0),
      minWidth: 330
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      '& .card-container': {
        margin: theme.spacing(1, 0),
        minWidth: 350,
        minHeight: 370
      }
    }
  },
  flex: {
    display: 'flex'
  },
  headCardContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  centerElements: {
    display: 'flex',
    alignItems: 'center'
  },
  paddingVerifyIcon: {
    paddingLeft: theme.spacing(1)
  },
  footerCardContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  linkColor: {
    color: theme.palette.info.light
  }
}))

export default Styles
