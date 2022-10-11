import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  paddingIcon: {
    paddingRight: theme.spacing(2),
    display: 'flex'
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center'
  },
  languageLabel: {
    color: theme.palette.common.black,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
}))

export default Styles
