import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useState, useCallback, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { BaseSnackbar } from 'components'
import { useTranslation } from 'next-i18next'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'
import { Button } from '@edenia/ui-kit'
import { AlertColor } from '@mui/material'
import clsx from 'clsx'

import { smartProxyUtil } from 'utils'
import { useSharedState } from 'context/state.context'
import LanguageSelector from 'components/LanguageSelector'

import useStyles from './styles'
import { default as routes } from './routes.json'

const { mainRoutes } = routes

type HeaderProps = {
  onDrawerToggle?(): void
}

type MessageObject = {
  message: string
  severity: AlertColor
  visible: boolean
}

const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const [state] = useSharedState()
  const { t } = useTranslation()
  const classes = useStyles()
  const router = useRouter()
  const { asPath } = router
  const [pathName, setPathName] = useState<any>()
  const [message, setMessage] = useState<MessageObject>({
    message: '',
    severity: 'success',
    visible: false
  })

  const handleDelegateVote = async () => {
    try {
      if (!state?.ual?.activeUser?.accountName) {
        setMessage({
          severity: 'warning',
          message: t('routes.mustLogin'),
          visible: true
        })
        return
      }
      const delegateVoteTrx = smartProxyUtil.buildDelegateTransaction(
        state?.ual?.activeUser?.accountName
      )
      await state?.ual?.activeUser?.signTransaction(delegateVoteTrx, {
        blocksBehind: 3,
        expireSeconds: 1200,
        broadcast: true
      })
      setMessage({
        severity: 'success',
        message: t('routes.successfulVote'),
        visible: true
      })
    } catch (error) {
      setMessage({
        severity: 'error',
        message: t('routes.somethingWrong'),
        visible: true
      })
    }
  }

  const onCloseSnackBar: any = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      setMessage({ ...message, visible: false })
    },
    [message]
  )

  useEffect(() => {
    setPathName(asPath.replace('/', ''))
  }, [asPath, setPathName])

  console.log(pathName)

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={clsx(classes.drawerPaper, classes.topBarStyle)}>
        <div className={classes.menuContainer}>
          <div
            className={clsx(classes.drawerContainer, classes.drawerShowDesktop)}
          >
            <div className={classes.logoAndMenu}>
              <span className={classes.routeLabel}>
                {t(`routes.${pathName}`)}
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
              <span className={classes.routeLabel}>
                {t(`routes.${pathName}`)}
              </span>
            </div>
            <div className={classes.leftBox}>
              <div className={classes.languageBox}>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </Toolbar>
      <div style={{ zIndex: 2 }}>
        <BaseSnackbar
          snackbarProps={{
            open: message.visible,
            onClose: onCloseSnackBar
          }}
          alertProps={{
            severity: message.severity
          }}
          message={message.message}
        />
      </div>
    </AppBar>
  )
}

export default Header
