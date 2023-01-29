import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  topInfo: {
    padding: theme.spacing(4, 2, 2),
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  columnBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  currentReward: {
    flexDirection: 'row',
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column'
    }
  },
  actionBox: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0,0,0,0.12)',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  legend: {
    borderLeft: '3px solid #2563EB',
    display: 'flex',
    minHeight: 70,
    marginLeft: theme.spacing(2)
  },
  legendInfo: {
    margin: theme.spacing(2),
    fontWeight: '400',
    display: 'flex',
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  graph: {
    marginTop: theme.spacing(2),
    height: 400
  },
  lastBlock: {
    marginBottom: theme.spacing(2)
  },
  graphTitle: {
    fontWeight: '700',
    fontSize: 16,
    padding: theme.spacing(2),
    lineHeight: '20px',
    color: '#000000'
  },
  btnAction: {
    textTransform: 'capitalize',
    minWidth: 113,
    height: 36,
    display: 'flex',
    justifyContent: 'center'
  },
  disabledBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    color: '#000000'
  },
  info: {
    marginLeft: theme.spacing(3),
    fontWeight: '400',
    letterSpacing: '-0.4px',
    fontSize: 16,
    lineHeight: '20px',
    color: '#000000'
  },
  titleLabel: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: '20px',
    color: '#000000'
  },
  title: {
    fontWeight: '500',
    letterSpacing: '-0.4px',
    fontSize: 18,
    lineHeight: '28px',
    color: '#000000'
  },
  rightTitle: {
    fontWeight: '700',
    textAlign: 'center'
  },
  outlinedBtn: {
    backgroundColor: 'transparent',
    color: '#2563EB',
    boxShadow: 'none'
  },
  outlinedBtnRed: {
    backgroundColor: 'transparent',
    color: '#C5283D',
    boxShadow: 'none'
  },
  accountSubmit: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiTextField-root': {
      marginRight: theme.spacing(4)
    }
  },
  claimBox: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiFormControlLabel-root': {
      marginRight: theme.spacing(4),
      '& .MuiFormControlLabel-label': {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: '20px',
        letterSpacing: '-0.4px',
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    '& .Mui-checked+.MuiSwitch-track': {
      backgroundColor: '#2563EB !important'
    }
  },
  checked: {
    color: '#2563EB !important'
  }
}))

export default Styles
