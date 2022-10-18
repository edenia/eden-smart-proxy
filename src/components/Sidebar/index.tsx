import React, { memo, useEffect, useState } from 'react'
import Image from 'next/image'
import { Drawer, DrawerProps, Typography, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { PreviewProfile } from '@edenia/ui-kit'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import clsx from 'clsx'

import { useSharedState } from 'context/state.context'
import { atomicAssetsUtil, smartProxyUtil } from 'utils'
import logoImage from '/public/logos/eden-proxy-logo.png'
import AuthButton from 'components/AuthUAL'

import Styles from './styles'
import VoterSvg from './Voter.svg'
import VoteSvg from './Vote.svg'
import AboutSvg from './About.svg'

const useStyles = Styles

type SidebarType = {
  onClose?(): void
  props: DrawerProps
}

const Sidebar: React.FC<SidebarType> = ({ onClose, props }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const classes = useStyles()
  const [state, { logout }] = useSharedState()
  const [userData, setUserData] = useState<any>()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const getUserData = async () => {
    const userData = await smartProxyUtil.getEdenMembers(
      state?.ual?.activeUser?.accountName,
      1
    )
    const userInfo = await atomicAssetsUtil.getTemplate(
      userData.rows[0][1]?.nft_template_id
    )
    setUserData({ ...userInfo, userData: userData.rows[0][1]?.nft_template_id })
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleLogout = (event: Event | React.SyntheticEvent) => {
    logout()
    handleClose(event)
    router.push('/')
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  const prevOpen = React.useRef(open)

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  useEffect(() => {
    if (!state?.ual?.activeUser?.accountName) return

    getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.ual?.activeUser?.accountName])

  return (
    <Drawer onClose={onClose} {...props}>
      <div className={classes.drawer}>
        <div>
          <div className={classes.sidebarHeader}>
            <Link href={'/'} underline={'none'}>
              <Image src={logoImage} />
            </Link>
          </div>
          <div className={classes.scrollbar}>
            <Link
              href={'/about'}
              underline={'none'}
              className={clsx(classes.navLink, {
                [classes.selected]: '/about' === router.pathname
              })}
            >
              <AboutSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                {t('routes.about')}
              </Typography>
              <p />
            </Link>
            <Link
              href={'/voters'}
              underline={'none'}
              className={clsx(classes.navLink, {
                [classes.selected]: '/voters' === router.pathname
              })}
            >
              <VoterSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                {t('routes.voters')}
              </Typography>
              <p />
            </Link>
            <Link
              href={'/vote'}
              underline={'none'}
              className={clsx(classes.navLink, {
                [classes.selected]: '/vote' === router.pathname
              })}
            >
              <VoteSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                {t('routes.vote')}
              </Typography>
              <p />
            </Link>
          </div>
        </div>
        <div className={classes.footerBox}>
          {state?.ual?.activeUser ? (
            <>
              <button
                ref={anchorRef}
                id='composition-button'
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                aria-hidden='true'
                className={classes.userBox}
              >
                <PreviewProfile
                  name={userData?.name}
                  nameSize='12px'
                  nameFontWeight='600'
                  image={`https://ipfs.io/ipfs/${userData?.image}`}
                  selectableItems={
                    <div className={classes.centerSelectableItems}>
                      <Typography variant='caption'>
                        <Link
                          href={`https://t.me/${userData?.social?.telegram}`}
                          rel='noreferrer'
                          underline='none'
                          target='_blank'
                        >
                          @{userData?.social?.telegram}
                        </Link>
                      </Typography>
                    </div>
                  }
                />
              </button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-start'
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start'
                          ? 'left top'
                          : 'left bottom'
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id='composition-menu'
                          aria-labelledby='composition-button'
                        >
                          <MenuItem onClick={handleLogout}>
                            {t('routes.logout')}
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <div className={classes.btnLoginBox}>
              <AuthButton btnLabel={t('routes.signin')} />
            </div>
          )}
        </div>
      </div>
    </Drawer>
  )
}

export default memo(Sidebar)
