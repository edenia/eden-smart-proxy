import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'

import useCountdown from 'hooks/useCountdown'
import { PopoverMessage } from 'components'

import useStyle from './styles'

const CountdownTimer = ({
  date,
  distributionLabel
}: {
  date: number
  style?: string
  distributionLabel: string
}): JSX.Element => {
  const [days, hours, minutes, seconds] = useCountdown(date)
  const { t } = useTranslation()
  const classes = useStyle()

  return (
    <Box className={classes.countdownContainer}>
      {!!days && (
        <>
          <Box className={classes.timeItemBox}>
            <span className={classes.items}>{days}</span>
            <span className={classes.labels}>{t('days')}</span>
          </Box>
          <span className={classes.separator}>:</span>
        </>
      )}
      <Box className={classes.timeItemBox}>
        <span className={classes.items}>{hours}</span>
        <span className={classes.labels}>{t('hrs')}</span>
      </Box>
      <span className={classes.separator}>:</span>

      <Box className={classes.timeItemBox}>
        <span className={classes.items}>{minutes}</span>
        <span className={classes.labels}>{t('mins')}</span>
      </Box>
      <span className={classes.separator}>:</span>

      <Box className={classes.timeItemBox}>
        <span className={classes.items}>{seconds}</span>
        <span className={classes.labels}>{t('secs')}</span>
      </Box>
      <PopoverMessage message={distributionLabel} />
    </Box>
  )
}
export default CountdownTimer
