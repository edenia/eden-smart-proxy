import React, { memo, useEffect, useState } from 'react'
import Image from 'next/image'
import { Drawer, DrawerProps, Typography, Link } from '@mui/material'
import { PreviewProfile } from '@edenia/ui-kit'

import { useSharedState } from 'context/state.context'
import { atomicAssetsUtil, smartProxyUtil } from 'utils'
import logoImage from '/public/logos/eden-proxy-logo.png'

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
  const classes = useStyles()
  const [state] = useSharedState()
  const [userData, setUserData] = useState<any>()

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

  useEffect(() => {
    if (!state?.ual?.activeUser?.accountName) return

    getUserData()
  }, [state?.ual?.activeUser?.accountName])

  return (
    <Drawer onClose={onClose} {...props}>
      <div className={classes.drawer}>
        <div>
          <div className={classes.sidebarHeader}>
            <Image src={logoImage} />
          </div>
          <div className={classes.scrollbar}>
            <Link
              href={'/voters'}
              underline={'none'}
              className={classes.navLink}
            >
              <VoterSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                Voters
              </Typography>
              <p />
            </Link>
            <Link href={'/vote'} underline={'none'} className={classes.navLink}>
              <VoteSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                Vote
              </Typography>
              <p />
            </Link>
            <Link
              href={'/about'}
              underline={'none'}
              className={classes.navLink}
            >
              <AboutSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                About
              </Typography>
              <p />
            </Link>
          </div>
        </div>
        {state?.ual?.activeUser && (
          <div className={classes.footerBox}>
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
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default memo(Sidebar)
