import { makeStyles } from '@mui/styles'

const useStyle = makeStyles(theme => ({
  timeItemBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  countdownContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: `0 ${theme.spacing(1)}`
  },
  items: { fontSize: 17, lineHeight: 'initial', marginTop: '7px' },
  separator: { fontSize: 17, lineHeight: 'initial', margin: '0 2px' },
  labels: {
    fontSize: 9,
    textTransform: 'lowercase',
    marginTop: '-3px',
    lineHeight: 'initial'
  }
}))

export default useStyle
