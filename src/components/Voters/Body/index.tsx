import CircularProgress from '@mui/material/CircularProgress'
import { DelegateItem, Button } from '@edenia/ui-kit'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import {
  smartProxyUtil,
  atomicAssetsUtil,
  genesisEdenUtil,
  eosioUtil
} from 'utils'
import yesVotingIcon from '/public/icons/yes-voting-icon.png'
import notVotingIcon from '/public/icons/not-voting-icon.png'
import votingOtherIcon from '/public/icons/voting-for-other-icon.png'

import useStyles from './styles'

type BodyVoters = {
  searchValue: string | undefined
}

const Body: React.FC<BodyVoters> = ({ searchValue }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [loadingData, setLoadingData] = useState<boolean>(true)
  const [edenMembers, setEdenMembers] = useState<any>([])
  const [currentEdenMembers, setCurrentEdenMembers] = useState<any>([])

  const loadMembers = async nextKey => {
    setLoadingData(true)
    const members = await smartProxyUtil.getEdenMembers(
      nextKey === '' ? undefined : nextKey,
      50
    )

    if (members) {
      const activeMembers = members?.rows?.filter(
        member => member[1]?.status === 1
      )
      const electionRankSize = await genesisEdenUtil.getRanks()
      const membersCompleteDataPromise = activeMembers.map(async member => {
        const { rows } = await smartProxyUtil.getVotes(
          member[1]?.account,
          member[1]?.account,
          1
        )

        const memberInfo = await atomicAssetsUtil.getTemplate(
          member[1]?.nft_template_id
        )

        const voteState = await eosioUtil.getVotingState(member[1]?.account)

        return {
          ...member,
          info: {
            ...memberInfo,
            rank: genesisEdenUtil.classifyMemberRank(
              member[1].election_rank,
              electionRankSize.length - 1
            )
          },
          next_key: members.next_key,
          vote: {
            state: voteState,
            amount: rows.length > 0 ? rows[0]?.producers.length : 0
          }
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
          actionItemStyles={classes.itemActionStyle}
          text={
            delegate?.vote?.state !== eosioUtil.VoteState.ForProxy
              ? delegate?.vote?.state === eosioUtil.VoteState.NoVoting
                ? t('voters.noVoting')
                : t('voters.voteByOther')
              : `${t('voters.voteFor')} ${String(delegate?.vote?.amount)} `
          }
          name={delegate[1].name}
          image={`https://ipfs.io/ipfs/${delegate?.info?.image}`}
          target='_blank'
          link={`https://bloks.io/account/edensmartprx?loadContract=true&tab=Tables&table=votes&account=edensmartprx&scope=edensmartprx&limit=1&lower_bound=${delegate[1]?.account}&upper_bound=${delegate[1]?.account}`}
          linkIcon={
            delegate?.vote?.state === eosioUtil.VoteState.ForProxy &&
            '/icons/ref-icon.png'
          }
          avatarIcon={delegate?.info?.rank?.badge}
          headItem={
            <Image
              src={
                delegate.vote?.state !== eosioUtil.VoteState.ForProxy
                  ? delegate.vote?.state === eosioUtil.VoteState.ForOther
                    ? votingOtherIcon
                    : notVotingIcon
                  : yesVotingIcon
              }
            />
          }
          profileLink={`https://genesis.eden.eoscommunity.org/members/${delegate[1]?.account}`}
          targetProfile='_blank'
          positionText={`${delegate?.info?.rank?.label} - Rate: n`}
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
