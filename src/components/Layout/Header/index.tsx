import React, { useState } from 'react'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import HeaderLogo from '/public/logos/header-logo.png'
import { CustomListItem } from 'components'
import { Icons } from 'components/CustomListItem'

import useStyles from './styles'
import { default as routes } from './routes.json'

const { mainRoutes } = routes

type LangItemProps = {
  label: string
  handleClick?(): void
  useDivider?: boolean
  isSelected?: boolean
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

const Header: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { asPath } = router

  const handlerDrawer = () => {
    setIsOpen(!isOpen)
  }

  const translateSite = () => {
    window.open(`${asPath}`, '_self')
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={clsx(classes.drawerPaper, classes.topBarStyle)}>
        <div className={classes.menuContainer}>
          <div className={(classes.drawerContainer, classes.drawerShowDesktop)}>
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
          <div className={(classes.drawerContainer, classes.drawerShowMobile)}>
            <div className={classes.logoAppbar}>
              <IconButton onClick={handlerDrawer}>
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
          <Drawer
            className={classes.drawer}
            anchor={'left'}
            open={isOpen}
            onClose={handlerDrawer}
          >
            <div className={classes.drawerContent}>
              <List>
                <div className={classes.logoDrawer}>
                  <Image
                    src={HeaderLogo}
                    alt='headerLogo'
                    width={150}
                    height={40}
                    placeholder='blur'
                    priority
                  />
                </div>
                <div className={classes.linkGruopBox}>
                  {mainRoutes.slice(0, 2).map(route => (
                    <CustomListItem
                      key={route.id}
                      href={route.path}
                      target='_self'
                      label={route.name}
                      iconName={route.name as keyof Icons}
                      isSelected={asPath === route.path}
                    />
                  ))}
                </div>
                <div className={classes.linkGruopBox}>
                  <Typography
                    variant='body1'
                    className={classes.linkGruopLabel}
                  >
                    Information
                  </Typography>
                  {mainRoutes.slice(2).map(route => (
                    <CustomListItem
                      href={route.path}
                      key={route.id}
                      target='_self'
                      label={route.name}
                      iconName={route.name as keyof Icons}
                      isSelected={asPath === route.path}
                    />
                  ))}
                </div>
              </List>
            </div>
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
