import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  genericListItemIconStyle: {
    width: 50
  },
  genericListItem: {
    height: 85
  },
  linkStyle: {
    textDecoration: 'none'
  },
  rootListItemIcon: {
    minWidth: '20px',
    marginRight: theme.spacing(2)
  },
  rootListItem: {
    paddingLeft: theme.spacing(3),
    paddingRight: 0,
    borderLeft: `solid 5px ${theme.palette.primary.main}`
  },
  selectedListItem: {
    borderLeft: `solid 5px ${theme.palette.secondary.main}`
  },
  primaryListItemText: {
    fontWeight: 'bold',
    color: theme.palette.common.white
  }
}))

export default Styles
