import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import Sidebar from 'components/Sidebar'

import Header from './Header'
import FooterComp from './Footer'
import Container from './Container'
import Styles from './styles'

const useStyles = Styles
const drawerWidth = 260

const Dashboard: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const router = useRouter()
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLayout, setShowLayout] = useState(true)

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
          <div className={classes.showOnMobile}>
            <Sidebar
              props={{
                style: { width: drawerWidth },
                variant: 'temporary',
                open: mobileOpen
              }}
              onClose={() => handleDrawerToggle()}
            />
          </div>
          <div className={classes.showOnDesktop}>
            <Sidebar
              props={{ style: { width: drawerWidth }, variant: 'permanent' }}
              onClose={() => handleDrawerToggle()}
            />
          </div>
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
        <FooterComp />
      </div>
    </div>
  )
}

export default Dashboard
