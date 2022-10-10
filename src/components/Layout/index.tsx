import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Hidden from '@mui/material/Hidden'
import clsx from 'clsx'

import Sidebar from 'components/Sidebar'

import Header from './Header'
import FooterComp from './Footer'
import Container from './Container'
import Styles from './styles'
import { Divider } from '@mui/material'

const useStyles = Styles
const drawerWidth = 260

const Dashboard: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const router = useRouter()
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLayout, setShowLayout] = useState<boolean>(true)

  const handleDrawerToggle = (): any => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    setShowLayout(!['/', '/es'].includes(router?.pathname))
  }, [router?.pathname])

  return (
    <div className={classes.root}>
      {showLayout && (
        <div className={classes.drawer}>
          <Hidden mdUp implementation='js'>
            <Sidebar
              props={{
                style: { width: drawerWidth },
                variant: 'temporary',
                open: mobileOpen
              }}
              onClose={() => handleDrawerToggle()}
            />
          </Hidden>
          <Hidden mdDown implementation='css'>
            <Sidebar
              props={{ style: { width: drawerWidth }, variant: 'permanent' }}
              onClose={() => handleDrawerToggle()}
            />
          </Hidden>
        </div>
      )}
      <div
        className={clsx(classes.mainContent, {
          [classes.paddingPage]: showLayout
        })}
      >
        {showLayout && <Header onDrawerToggle={handleDrawerToggle} />}
        <Container>
          <div className={classes.childContent}>{children}</div>
        </Container>
        <Divider />
        <FooterComp showWhite={showLayout} />
      </div>
    </div>
  )
}

export default Dashboard
