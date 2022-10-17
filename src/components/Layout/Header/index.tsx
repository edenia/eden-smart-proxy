import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useState, useCallback, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { BaseSnackbar } from 'components'
import { useTranslation } from 'next-i18next'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'
import { Button } from '@edenia/ui-kit'
import { AlertColor } from '@mui/material'
import clsx from 'clsx'

import { smartProxyUtil, eosioUtil } from 'utils'
import { useSharedState } from 'context/state.context'
import LanguageSelector from 'components/LanguageSelector'

import useStyles from './styles'

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
  const [showDelegateButton, setShowDelegateButton] = useState<boolean>(false)
  const [totalVotesDelegate, setTotalVotesDelegate] = useState<number>(0)
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
      setTimeout(async () => {
        await validateHasDelegateVote()
      }, 1000)
    } catch (error) {
      setMessage({
        severity: 'error',
        message: t('routes.somethingWrong'),
        visible: true
      })
    }
  }

  const validateHasDelegateVote = async () => {
    const delegateState = await eosioUtil.getVotingState(
      state?.ual?.activeUser?.accountName
    )
    setShowDelegateButton(
      delegateState === eosioUtil.VoteState.ForProxy ? false : true
    )
    setTotalVotesDelegate(await eosioUtil.getTotalEosVoteDelegate())
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

  useEffect(() => {
    if (!state?.ual?.activeUser?.accountName) return

    validateHasDelegateVote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

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
            </div>
            <div className={classes.languageBox}>
              <div className={classes.paddingLenguajeSelector}>
                <LanguageSelector />
              </div>
              <div>
                {showDelegateButton && (
                  <Button
                    icon='/icons/like-white-icon.png'
                    label='Delegate Vote'
                    variant='primary'
                    externalStyles={classes.btnDelegate}
                    onClick={() => handleDelegateVote()}
                  />
                )}
                <Typography
                  color='black'
                  variant={showDelegateButton ? 'caption' : 'subtitle2'}
                  display='flex'
                  justifyContent='center'
                >
                  {`${t('totalProxiedVotes')}: ${totalVotesDelegate} EOS`}
                </Typography>
              </div>
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
