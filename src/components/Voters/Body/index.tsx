import { DelegateItem } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { labelsRanks } from 'config/constants'
import { smartProxyUtil, atomicAssetsUtil } from 'utils'
import telegramIcon from '/public/icons/telegram-grey-icon.png'

import useStyles from './styles'

const Body: React.FC = () => {
  const classes = useStyles()
  const [edenMembers, setEdenMembers] = useState<any>()

  const loadMembers = async () => {
    const members = await smartProxyUtil.getEdenMembers()
    if (members) {
      const infoMembers = await atomicAssetsUtil.getTemplates()
      const test3 = members?.rows?.map((member): any => {
        const info = infoMembers.find(
          (template): any => member[1]?.account === template?.account
        )
        return { ...member, info }
      })
      setEdenMembers(test3)
    }
  }
  console.log({ edenMembers })
  useEffect(() => {
    loadMembers()
  }, [])

  return (
    <div className={classes.container}>
      {edenMembers?.map(delegate => (
        <DelegateItem
          key={delegate[1].name}
          text='Not Voting'
          // link={delegate.link}
          name={delegate[1].name}
          image={`https://ipfs.io/ipfs/${delegate?.info?.image}`}
          target='_blank'
          headItem={<Image src={telegramIcon} />}
          linkIcon='/icons/ref-icon.png'
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
