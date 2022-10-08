import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Drawer, Typography } from '@mui/material'

import Styles from './styles'

const useStyles = Styles

const Sidebar = ({ routes, onClose, ...props }) => {
  const classes = useStyles()

  console.log({ sidebarRoutes: routes })

  return (
    <Drawer onClose={onClose} {...props}>
      <div className={classes.drawer}>
        <div>
          <div className={classes.sidebarHeader}>
            <Typography className={classes.menuLabel} variant='h6'>
              Tomela papeee
            </Typography>
          </div>
          <span className={classes.scrollbar}></span>
        </div>
        <div className={classes.footerBox}>
          <span className={classes.navLabel}>{`tetito bonito`}</span>
        </div>
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  routes: PropTypes.array,
  onClose: PropTypes.func
}

export default memo(Sidebar)
