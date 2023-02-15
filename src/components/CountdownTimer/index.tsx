import React from 'react'
import { Box } from '@mui/material'

import useCountdown from 'hooks/useCountdown'
import { PopoverMessage } from 'components'

const CountdownTimer = ({
  date,
  style,
  distributionLabel
}: {
  date: number
  style: string
  distributionLabel: string
}): JSX.Element => {
  const SEVEN_DAYS_IN_MS = 17 * 24 * 60 * 60 * 1000
  const [days, hours, minutes, seconds] = useCountdown(date + SEVEN_DAYS_IN_MS)

  return (
    <Box display='flex' alignItems='center'>
      <span className={style}>{`${days}:${hours}:${minutes}:${seconds} `}</span>
      <PopoverMessage message={distributionLabel} />
    </Box>
  )
}
export default CountdownTimer
