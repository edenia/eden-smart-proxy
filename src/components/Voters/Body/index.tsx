import CircularProgress from '@mui/material/CircularProgress'
import { DelegateItem, Button } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { smartProxyUtil, atomicAssetsUtil, genesisEdenUtil } from 'utils'
import telegramIcon from '/public/icons/telegram-grey-icon.png'
import yesVotingIcon from '/public/icons/yes-voting-icon.png'
import notVotingIcon from '/public/icons/not-voting-icon.png'

import useStyles from './styles'

type BodyVoters = {
  searchValue: string | undefined
}

const Body: React.FC<BodyVoters> = ({ searchValue }) => {
  const classes = useStyles()
  const [loadingData, setLoadingData] = useState<boolean>(true)
  const [edenMembers, setEdenMembers] = useState<any>([])
  const [currentEdenMembers, setCurrentEdenMembers] = useState<any>([])

  const loadMembers = async nextKey => {
    setLoadingData(true)
    const members = await smartProxyUtil.getEdenMembers(
      nextKey === '' ? undefined : nextKey,
      5
    )
    if (members) {
      const infoMembers = await atomicAssetsUtil.getTemplates()
      const electionRankSize = await genesisEdenUtil.getRanks()
      const membersCompleteDataPromise = members?.rows?.map(async member => {
        const info = infoMembers.find(
          (template): any => member[1]?.account === template?.account
        )
        const { rows } = await smartProxyUtil.getVotes(
          member[1]?.account,
          member[1]?.account,
          1
        )

        return {
          ...member,
          info: {
            ...info,
            rank: genesisEdenUtil.classifyMemberRank(
              member[1].election_rank,
              electionRankSize.length - 1
            )
          },
          next_key: members.next_key,
          vote: rows.length > 0 ? rows[0].producers : undefined
        }
      })
      const membersCompleteData = await Promise?.all(membersCompleteDataPromise)
      setEdenMembers([...edenMembers, ...membersCompleteData])
    }
    setLoadingData(false)
  }

  const search = () => {
    if (typeof searchValue === 'string' && searchValue !== '') {
      if (currentEdenMembers.length === 0) setCurrentEdenMembers(edenMembers)

      const filterMembers = edenMembers.filter(bp =>
        bp[1]?.name?.toLowerCase()?.includes(searchValue.toLowerCase())
      )
      setEdenMembers(filterMembers)

      const membersName = filterMembers.reduce((reduceList, element) => {
        return [...reduceList, element[1]?.name]
      }, [])

      setEdenMembers([
        ...filterMembers,
        ...currentEdenMembers.filter(bp => {
          if (!membersName?.includes(bp[1]?.name)) {
            return bp[1]?.name
              ?.toLowerCase()
              ?.includes(searchValue.toLowerCase())
          }
        })
      ])
    } else {
      setEdenMembers(currentEdenMembers)
      setCurrentEdenMembers([])
    }
  }

  useEffect(() => {
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  useEffect(() => {
    loadMembers(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.container}>
      {edenMembers?.map(delegate => (
        <DelegateItem
          key={delegate[1].name}
          text={
            delegate.vote
              ? `Voted for ${delegate?.vote?.length} `
              : 'Not Voting '
          }
          name={delegate[1].name}
          image={`https://ipfs.io/ipfs/${delegate?.info?.image}`}
          target='_blank'
          avatarIcon={delegate?.info?.rank?.badge}
          headItem={
            <Image src={delegate.vote ? yesVotingIcon : notVotingIcon} />
          }
          // linkIcon={delegate.vote ? '/icons/ref-icon.png' : undefined}
          positionText={`${delegate?.info?.rank?.label} - Rate: n`}
          selectableItems={
            <div className={classes.centerSelectableItems}>
              <Image src={telegramIcon} alt='Telegram icon' />
              <Typography
                variant='subtitle2'
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
      {loadingData && (
        <div className={classes.loadMoreContainer}>
          <CircularProgress />
        </div>
      )}
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
