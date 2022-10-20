import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
  '@keyframes nprogress-spinner': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  testSyule: {
    animation: 'spin 1s linear infinite',
    color: theme.palette.grey[500],
    animationName: '$nprogress-spinner'
  }
}))

export default Styles
