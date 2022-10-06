import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  containerBottom: {
    display: 'flex',
    justifyContent: 'space-around'
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
