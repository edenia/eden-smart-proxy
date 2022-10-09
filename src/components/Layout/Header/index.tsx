import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'
import { Button } from '@edenia/ui-kit'
import clsx from 'clsx'

import HeaderLogo from '/public/logos/header-logo.png'
import LanguageSelector from 'components/LanguageSelector'

import useStyles from './styles'
import { default as routes } from './routes.json'

const { mainRoutes } = routes

type HeaderProps = {
  onDrawerToggle?(): void
}

const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const classes = useStyles()
  const router = useRouter()
  const { asPath } = router

  const handleDelegateVote = () => {
    alert('VOTE DELEGATED')
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={clsx(classes.drawerPaper, classes.topBarStyle)}>
        <div className={classes.menuContainer}>
          <div
            className={clsx(classes.drawerContainer, classes.drawerShowDesktop)}
          >
            <div className={classes.logoAndMenu}>
              <span className={classes.routeLabel}>
                {asPath.replace('/', '')}
              </span>
              <div className={classes.topBarMenu}>
                {mainRoutes.map(route => {
                  return (
                    <Link key={route.id} href={route.path} underline='none'>
                      <Typography
                        color='white'
                        variant='body1'
                        className={clsx('text', {
                          ['linkActive']: asPath === route.path
                        })}
                      >
                        {route.name}
                      </Typography>
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className={classes.languageBox}>
              <div className={classes.paddingLenguajeSelector}>
                <LanguageSelector />
              </div>
              <Button
                icon='/icons/like-white-icon.png'
                label='Delegate Vote'
                variant='primary'
                onClick={() => handleDelegateVote()}
              />
            </div>
          </div>
          <div
            className={clsx(classes.drawerContainer, classes.drawerShowMobile)}
          >
            <div className={classes.logoAppbar}>
              <IconButton onClick={onDrawerToggle}>
                <MenuIcon fontSize='large' className={classes.menuIconColor} />
              </IconButton>
              <Link className={classes.logo} href='/'>
                <Image
                  src={HeaderLogo}
                  alt='headerLogo'
                  width={160}
                  height={35}
                  placeholder='blur'
                  priority
                />
              </Link>
            </div>
            <div className={classes.leftBox}>
              <div className={classes.languageBox}>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
