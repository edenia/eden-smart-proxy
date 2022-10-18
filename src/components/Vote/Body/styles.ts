import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3),
    width: '100%',
    '& .delegate-bp-item-container': {
      flexDirection: 'column',
      padding: '8px !important',
      alignItems: 'flex-start',
      width: '100%',
      '& .centerItems': {
        justifyContent: 'flex-start',
        '& .delegate-bp-item-proxy-padding': {
          padding: '0 41px'
        }
      }
    },
    [theme.breakpoints.up('sm')]: {
      '& .delegate-bp-item-container': {
        flexDirection: 'row',
        '& .centerItems': {
          '& .delegate-bp-item-proxy-padding': {
            padding: '0 39.5px 0 75px'
          }
        }
      }
    }
  },
  socialItems: {
    paddingTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  linkPadding: {
    padding: '0 4px'
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    margin: 'auto',
    objectFit: 'cover'
  },
  delegateBpItemCheckbox: {
    marginRight: '56px',
    cursor: 'pointer',
    width: '18px',
    height: '18px'
  },
  paddingSelectedAll: {
    padding: theme.spacing(1)
  }
}))

export default Styles
