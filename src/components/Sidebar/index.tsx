import React, { memo } from 'react'
import PropTypes from 'prop-types'
// import { NavLink } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
import { Drawer, Typography } from '@mui/material'

import { useSharedState } from '../../context/state.context'
// import { mainConfig } from '../../config'

import Styles from './styles'

const useStyles = Styles

const Sidebar = ({ routes, onClose, ...props }) => {
  const classes = useStyles()
  // const { t } = useTranslation('routes')
  const [state] = useSharedState()

  console.log({ state, routes })

  return (
    <Drawer onClose={onClose} {...props}>
      <div className={classes.drawer}>
        <div>
          <div className={classes.sidebarHeader}>
            <Typography className={classes.menuLabel} variant='h6'>
              DAO ID: My account
            </Typography>
          </div>
          <span className={classes.scrollbar}></span>
        </div>
        <div className={classes.footerBox}>
          <span className={classes.navLabel}>{`teto`}</span>
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
