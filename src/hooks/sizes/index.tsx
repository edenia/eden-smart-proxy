import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'

type Sizes = {
  xsDown: boolean
  smDown: boolean
  mdDown: boolean
  lgDown: boolean
  xlDown: boolean
  xsUp: boolean
  smUp: boolean
  mdUp: boolean
  lgUp: boolean
  xlUp: boolean
}

const useSizes = (): Sizes => {
  const theme = useTheme()

  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'))
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'))
  const xsUp = useMediaQuery(theme.breakpoints.up('xs'))
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'))

  return {
    xsDown,
    smDown,
    mdDown,
    lgDown,
    xlDown,
    xsUp,
    smUp,
    mdUp,
    lgUp,
    xlUp
  }
}

export default useSizes
