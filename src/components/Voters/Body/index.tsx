import { DelegateItem, Button } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { smartProxyUtil, atomicAssetsUtil, genesisEdenUtil } from 'utils'
import telegramIcon from '/public/icons/telegram-grey-icon.png'

import useStyles from './styles'

const Body: React.FC = () => {
  const classes = useStyles()
  const [edenMembers, setEdenMembers] = useState<any>([])

  const loadMembers = async nextKey => {
    const members = await smartProxyUtil.getEdenMembers(
      nextKey === '' ? undefined : nextKey,
      5
    )
    if (members) {
      const infoMembers = await atomicAssetsUtil.getTemplates()
      const electionRankSize = await genesisEdenUtil.getRanks()
      const membersCompleteData = members?.rows?.map((member): any => {
        const info = infoMembers.find(
          (template): any => member[1]?.account === template?.account
        )
        return {
          ...member,
          info: {
            ...info,
            rank: genesisEdenUtil.classifyMemberRank(
              member[1].election_rank,
              electionRankSize.length
            )
          },
          next_key: members.next_key
        }
      })
      setEdenMembers([...edenMembers, ...membersCompleteData])
    }
  }

  useEffect(() => {
    loadMembers(undefined)
  }, [])

  return (
    <div className={classes.container}>
      {edenMembers?.map(delegate => (
        <DelegateItem
          key={delegate[1].name}
          text='Not Voting'
          name={delegate[1].name}
          image={`https://ipfs.io/ipfs/${delegate?.info?.image}`}
          target='_blank'
          avatarIcon={delegate?.info?.rank?.badge}
          headItem={<Image src={telegramIcon} />}
          linkIcon='/icons/ref-icon.png'
          positionText={`${delegate?.info?.rank?.label} - Rate: n`}
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
      {edenMembers[edenMembers?.length - 1]?.next_key !== '' && (
        <div className={classes.loadMoreContainer}>
          <Button
            label='Load More'
            variant='secondary'
            onClick={() =>
              loadMembers(edenMembers[edenMembers.length - 1].next_key)
            }
          />
        </div>
      )}
    </div>
  )
}

export default Body
