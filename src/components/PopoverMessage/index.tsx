import React, { useState, MouseEvent } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import useStyles from './styles'

const PopoverMessage = ({ message }: { message: string }): JSX.Element => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <Typography
        className={classes.popoverDesktop}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <InfoIcon color='info' />
      </Typography>
      <IconButton
        className={classes.popoverMobile}
        aria-label={open ? 'mouse-over-popover' : undefined}
        onClick={handlePopoverOpen}
      >
        <InfoIcon color='info' />
      </IconButton>
      <Popover
        id='mouse-over-popover'
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <span className={classes.info}>{message}</span>
      </Popover>
    </div>
  )
}

export default PopoverMessage
