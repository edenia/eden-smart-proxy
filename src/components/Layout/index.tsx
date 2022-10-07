import { useRef, useState } from 'react'

import Header from './Header'
import Container from './Container'
import Styles from './styles'

const useStyles = Styles

type LayoutProps = {
  children: JSX.Element
  isDarkTheme: boolean
  toggleThemeType(): void
}

const Layout: React.FC<LayoutProps> = ({
  children
  // isDarkTheme,
  // toggleThemeType
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
      {/* {typeof window !== 'undefined' &&
        !['/', '/es'].includes(window?.location?.pathname) && <Header />} */}
      <Header />
      <Container>{children}</Container>
      {/* <Footer
        socialMediaItems={constantConfig?.footer?.socialMediaItems}
        buttomContent={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{ paddingRight: '4px' }}>
              <Image src={edeniaLogo} />
            </div>
            <Typography variant='subtitle1' color={theme.palette.grey[600]}>
              <Link href='https://edenia.com' color={theme.palette.grey[600]}>
                Hosted by Edenia{' '}
              </Link>
              - Community Owned
            </Typography>
          </div>
        }
        itemsFooter={constantConfig?.footer?.footerItems}
        bgColor='#343434'
        color='#FFFFFF'
      /> */}
    </div>
  )
}

export default Layout
