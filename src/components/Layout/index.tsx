import { useRef, useState } from 'react'

import Header from './Header'
import Container from './Container'
import Footer from './Footer'
import Styles from './styles'

const useStyles = Styles

type LayoutProps = {
  children: JSX.Element
  isDarkTheme: boolean
  toggleThemeType(): void
}

const Layout: React.FC<LayoutProps> = ({
  children,
  isDarkTheme,
  toggleThemeType
}) => {
  const classes = useStyles()
  const wrapper = useRef<HTMLInputElement>(null)
  // WIP: header refactor
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  const scrolling = () => {
    const currentScroll = wrapper?.current?.scrollTop || 0

    setShowNavbar(!!(currentScroll > lastScroll))
    setLastScroll(currentScroll)
  }

  return (
    <div ref={wrapper} className={classes.wrapperClass} onScroll={scrolling}>
      <Header />
      <Container>{children}</Container>
      <Footer isDarkTheme={isDarkTheme} toggleThemeType={toggleThemeType} />
    </div>
  )
}

export default Layout
