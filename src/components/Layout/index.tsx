import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Hidden from '@mui/material/Hidden'
// import { makeStyles } from '@mui/styles'

import Sidebar from 'components/Sidebar'

import Header from './Header'
import FooterComp from './Footer'
import Container from './Container'
import Styles from './styles'

const useStyles = Styles

// type LayoutProps = {
//   children: JSX.Element
//   isDarkTheme: boolean
//   toggleThemeType(): void
// }

// const Layout: React.FC<LayoutProps> = ({
//   children
//   // isDarkTheme,
//   // toggleThemeType
// }) => {
//   const classes = useStyles()
//   const wrapper = useRef<HTMLInputElement>(null)
//   // WIP: header refactor
//   const [, setShowNavbar] = useState(true)
//   const [lastScroll, setLastScroll] = useState(0)

//   const scrolling = () => {
//     const currentScroll = wrapper?.current?.scrollTop || 0

//     setShowNavbar(!!(currentScroll > lastScroll))
//     setLastScroll(currentScroll)
//   }

//   return (
//     <div ref={wrapper} className={classes.wrapperClass} onScroll={scrolling}>
//       {/* {typeof window !== 'undefined' &&
//         !['/', '/es'].includes(window?.location?.pathname) && <Header />} */}
//       <Header />
//       <Container>{children}</Container>
//       <FooterComp />
//     </div>
//   )
// }

// export default Layout

const drawerWidth = 260
// const useStyles = makeStyles(theme => styles(theme, drawerWidth))

const Dashboard = ({ children, routes }) => {
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

  console.log({ router })

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
      <div className={classes.mainContent}>
        {showLayout && <Header onDrawerToggle={handleDrawerToggle} />}
        <Container>
          <div className={classes.childContent}>{children}</div>
        </Container>
        <FooterComp />
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.array
}

export default Dashboard
