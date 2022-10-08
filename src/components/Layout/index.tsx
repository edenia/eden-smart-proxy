import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Hidden from '@mui/material/Hidden'
import clsx from 'clsx'

import Sidebar from 'components/Sidebar'

import Header from './Header'
import FooterComp from './Footer'
import Container from './Container'
import Styles from './styles'

const useStyles = Styles
const drawerWidth = 260

const Dashboard: React.FC<{ children: React.ReactNode; routes: Array<any> }> =
  ({ children, routes }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [showLayout, setShowLayout] = useState(true)
    const router = useRouter()
    const classes = useStyles()

    const handleDrawerToggle = () => {
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
                PaperProps={{ style: { width: drawerWidth } }}
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                routes={routes}
              />
            </Hidden>
            <Hidden mdDown implementation='css'>
              <Sidebar
                PaperProps={{ style: { width: drawerWidth } }}
                variant='permanent'
                routes={routes}
                onClose={handleDrawerToggle}
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
          <FooterComp />
        </div>
      </div>
    )
  }

export default Dashboard
