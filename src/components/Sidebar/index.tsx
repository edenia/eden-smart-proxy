import React, { memo } from 'react'
import Image from 'next/image'
import { Drawer, Typography, Link } from '@mui/material'
import { PreviewProfile } from '@edenia/ui-kit'

import telegramIcon from '/public/icons/telegram-grey-icon.png'
import logoImage from '/public/logos/eden-proxy-logo.png'

import Styles from './styles'
import VoterSvg from './Voter.svg'
import VoteSvg from './Vote.svg'
import AboutSvg from './About.svg'

const useStyles = Styles

const Sidebar: React.FC<{ onClose: () => null }> = ({ onClose, ...props }) => {
  const classes = useStyles()

  return (
    <Drawer onClose={onClose} {...props}>
      <div className={classes.drawer}>
        <div>
          <div className={classes.sidebarHeader}>
            <Image src={logoImage} />
          </div>
          <div className={classes.scrollbar}>
            <Link href={'/'} underline={'none'} className={classes.navLink}>
              <VoterSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                Voters
              </Typography>
              <p />
            </Link>
            <Link href={'/'} underline={'none'} className={classes.navLink}>
              <VoteSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                Vote
              </Typography>
              <p />
            </Link>
            <Link href={'/'} underline={'none'} className={classes.navLink}>
              <AboutSvg />
              <Typography variant='subtitle1' className={classes.navLabel}>
                About
              </Typography>
              <p />
            </Link>
          </div>
        </div>
        <div className={classes.footerBox}>
          <PreviewProfile
            name='Teto'
            selectableItems={
              <div className={classes.centerSelectableItems}>
                <Image src={telegramIcon} alt='Telegram icon' />
                <Typography
                  variant='subtitle1'
                  className={classes.labelSelectedItems}
                >
                  <Link
                    // href={`https://t.me/${delegate?.info?.social?.telegram}`}
                    rel='noreferrer'
                    underline='none'
                    target='_blank'
                  >
                    @teto
                  </Link>
                </Typography>
              </div>
            }
          />
        </div>
      </div>
    </Drawer>
  )
}

export default memo(Sidebar)
