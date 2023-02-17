/* eslint-disable react-hooks/exhaustive-deps */
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useState, useCallback, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { BaseSnackbar, DelegateButton } from 'components'
import { useTranslation } from 'next-i18next'
import MenuIcon from '@mui/icons-material/Menu'
import { useRouter } from 'next/router'
import { AlertColor } from '@mui/material'
import clsx from 'clsx'

import { eosioUtil } from 'utils'
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
  const [showDelegateButton, setShowDelegateButton] = useState<boolean>(true)
  const [totalVotesDelegate, setTotalVotesDelegate] = useState<number>(0)
  const { asPath } = router
  const [pathName, setPathName] = useState<any>()
  const [message, setMessage] = useState<MessageObject>({
    message: '',
    severity: 'success',
    visible: false
  })

  const validateHasDelegateVote = async () => {
    const delegateState = await eosioUtil.getVotingState(
      state?.ual?.activeUser?.accountName
    )

    setShowDelegateButton(!(delegateState === eosioUtil.VoteState.ForProxy))

    const totalVotes = await eosioUtil.getTotalEosVoteDelegate()
    const exponent = Math.pow(10, 4)

    setTotalVotesDelegate(totalVotes / exponent)
  }

  const onCloseSnackBar: any = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') return

      setMessage({ ...message, visible: false })
    },
    [message]
  )

  useEffect(() => {
    setPathName(asPath.replace('/', ''))
  }, [asPath, setPathName])

  useEffect(() => {
    const totalVotes = async () => {
      const totalVotes = await eosioUtil.getTotalEosVoteDelegate()
      const exponent = Math.pow(10, 4)

      setTotalVotesDelegate(totalVotes / exponent)
    }

    totalVotes()
  }, [])

  useEffect(() => {
    if (!state?.ual?.activeUser?.accountName) {
      setShowDelegateButton(true)

      return
    }

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
                  <DelegateButton
                    icon='/icons/like-white-icon.png'
                    setMessage={setMessage}
                    buttonStyles={classes.btnDelegate}
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
              <div
                className={clsx(classes.languageBox, classes.drawerShowTablet)}
              >
                <LanguageSelector />
              </div>
              <div>
                {showDelegateButton && (
                  <div className={classes.delegateButtonBox}>
                    <DelegateButton
                      isMobile
                      icon='/icons/like-white-icon.png'
                      setMessage={setMessage}
                      buttonStyles={classes.btnDelegate}
                    />
                  </div>
                )}
                <Typography
                  color='black'
                  variant={showDelegateButton ? 'caption' : 'subtitle2'}
                  display='flex'
                  justifyContent='center'
                  textAlign='center'
                >
                  {t('totalProxiedVotes')}
                  <br />
                  {`${totalVotesDelegate} EOS`}
                </Typography>
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
