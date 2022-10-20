import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 20, 3, 3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    }
  },
  paddingBulletPoint: {
    padding: theme.spacing(1, 0, 1, 2)
  },
  link: {
    padding: theme.spacing(0, 1)
  },
  linkInitial: {
    paddingRight: theme.spacing(1)
  },
  blockDescription: {
    padding: theme.spacing(1, 0)
  },
  blockAnswer: {
    paddingBottom: theme.spacing(1)
  }
}))

export default Styles
