import { useRef, useState } from 'react'
import { Footer } from '@edenia/ui-kit'

import Header from './Header'
import Container from './Container'
import { constantConfig } from 'config'
// import Footer from './Footer'
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
  const [, setShowNavbar] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  const scrolling = () => {
    const currentScroll = wrapper?.current?.scrollTop || 0

    setShowNavbar(!!(currentScroll > lastScroll))
    setLastScroll(currentScroll)
  }

  return (
    <div ref={wrapper} className={classes.wrapperClass} onScroll={scrolling}>
      {typeof window !== 'undefined' &&
        !['/', '/es'].includes(window?.location?.pathname) && <Header />}
      <Container>{children}</Container>
      {/* <Footer isDarkTheme={isDarkTheme} toggleThemeType={toggleThemeType} /> */}
      <Footer
        socialMediaItems={constantConfig?.footer?.socialMediaItems}
        buttomContent={}
        itemsFooter={}
        bgColor=''
        color=''
      />
    </div>
  )
}

export default Layout
