import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3),
    width: '100%',
    '& .delegate-bp-item-container': {
      flexDirection: 'column',
      padding: '8px !important',
      alignItems: 'flex-start',
      width: 300,
      '& .centerItems': {
        justifyContent: 'flex-start',
        '& .delegate-bp-item-proxy-padding': {
          padding: '0 41px !important'
        }
      }
    }
  },
  linkPadding: {
    padding: '0 4px'
  },
  flex: {
    paddingTop: '8px',
    display: 'flex',
    flexDirection: 'column'
  }
}))

export default Styles
