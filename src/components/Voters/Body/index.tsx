import { DelegateItem } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import Image from 'next/image'

import { labelsRanks } from 'config/constants'
import { smartProxyUtil, atomicAssetsUtil } from 'utils'
import logoImage from '/public/logos/eden-proxy-logo.png'
import telegramIcon from '/public/icons/telegram-grey-icon.png'

import useStyles from './styles'
import { useEffect, useState } from 'react'

const Body: React.FC = () => {
  const classes = useStyles()
  const [EdenMembers, setEdenMembers] = useState<any>()

  const loadMembers = async () => {
    const members = await smartProxyUtil.getEdenMembers()
    if (members) {
      const infoMembers = await atomicAssetsUtil.getTemplates()
      const test3 = members?.rows?.map((member): any => {
        const info = infoMembers.find(
          (template): any => member[1]?.name === template?.name
        )
        return { ...member, info }
      })
      setEdenMembers(test3)
    }
  }

  useEffect(() => {
    loadMembers()
  }, [])

  return (
    <div className={classes.container}>
      {EdenMembers?.map(delegate => (
        <DelegateItem
          key={delegate[1].name}
          text='Not Voting'
          // link={delegate.link}
          name={delegate[1].name}
          image={delegate.image}
          target='_blank'
          headItem={<Image src={telegramIcon} />}
          // linkIcon={delegate.linkIcon}
          // avatarIcon={delegate.avatarIcon}
          positionText={labelsRanks?.electionRank?.[delegate[1]?.election_rank]}
          selectableItems={
            <div className={classes.centerSelectableItems}>
              <Image src={telegramIcon} alt='Telegram icon' />
              <Typography
                variant='subtitle1'
                className={classes.labelSelectedItems}
              >
                <Link
                  href={`https://t.me/${delegate?.info?.social?.telegram}`}
                  rel='noreferrer'
                  underline='none'
                  target='_blank'
                >
                  {delegate?.info?.social?.telegram}
                </Link>
              </Typography>
            </div>
          }
        />
      ))}
    </div>
  )
}

export default Body
