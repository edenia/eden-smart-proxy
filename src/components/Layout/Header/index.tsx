import React from 'react'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import HeaderLogo from '/public/logos/header-logo.png'

import useStyles from './styles'
import { default as routes } from './routes.json'

const { mainRoutes } = routes

type LangItemProps = {
  label: string
  handleClick?(): void
  useDivider?: boolean
  isSelected?: boolean
}

type HeaderProps = {
  onDrawerToggle?(): void
}

const LangItem: React.FC<LangItemProps> = ({
  label,
  handleClick,
  useDivider,
  isSelected
}) => {
  const classes = useStyles()

  return (
    <Box
      className={clsx(classes.langItemBox, { [classes.divider]: useDivider })}
      onClick={handleClick}
    >
      <Typography
        variant='body1'
        className={clsx(classes.languageColor, {
          [classes.selected]: isSelected
        })}
      >
        {label}
      </Typography>
    </Box>
  )
}

const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const classes = useStyles()
  const router = useRouter()
  const { asPath } = router

  const translateSite = () => {
    window.open(`${asPath}`, '_self')
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={clsx(classes.drawerPaper, classes.topBarStyle)}>
        <div className={classes.menuContainer}>
          <div
            className={clsx(classes.drawerContainer, classes.drawerShowDesktop)}
          >
            <div className={classes.logoAndMenu}>
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
              <LangItem label='EN' isSelected />
              <LangItem label='ES' handleClick={translateSite} useDivider />
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
                <LanguageIcon className={classes.languageColor} />
                <LangItem label='EN' isSelected />
                <LangItem label='ES' handleClick={translateSite} useDivider />
              </div>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
