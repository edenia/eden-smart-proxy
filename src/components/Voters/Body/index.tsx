import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { DelegateItem, Button } from '@edenia/ui-kit'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useQuery as useBoxQuery } from '@edenos/eden-subchain-client/dist/ReactSubchain'

import ImgLoading from '../../ImageLoad'
import {
  smartProxyUtil,
  atomicAssetsUtil,
  genesisEdenUtil,
  eosioUtil
} from 'utils'
import { Member, MembersQuery } from 'interfaces/members'
import { formattersUtil } from 'utils'
import yesVotingIcon from '/public/icons/yes-voting-icon.png'
import notVotingIcon from '/public/icons/not-voting-icon.png'
import votingOtherIcon from '/public/icons/voting-for-other-icon.png'

import useStyles from './styles'

type BodyVoters = {
  searchValue: string | undefined
}

export const MEMBER_DATA_FRAGMENT = `
    createdAt
    account
    profile {
        name
        img
        attributions
        social
        bio
    }
    inductionVideo
    participating
`

export const useMembers = () => {
  const result = useBoxQuery<MembersQuery>(`{
        members {
            edges {
                node {
                    ${MEMBER_DATA_FRAGMENT}
                }
            }
        }
    }`)

  let formattedMembers: Member[] = []

  if (!result.data) return { ...result, data: formattedMembers }

  const memberEdges = result.data.members.edges

  if (memberEdges) {
    formattedMembers = memberEdges.map(
      member =>
        formattersUtil.formatMembersQueryNodeAsMember(member.node) as Member
    )
  }

  return { ...result, data: formattedMembers }
}

const Body: React.FC<BodyVoters> = ({ searchValue }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [loadingData, setLoadingData] = useState<boolean>(true)
  const [edenMembers, setEdenMembers] = useState<any>([])
  const [currentEdenMembers, setCurrentEdenMembers] = useState<any>([])
  const { data: allMembers, ...memberQueryMetaData } = useMembers()

  console.log('🚀 ~ allMembers', allMembers)
  const loadMembers = async () => {
    // setLoadingData(true)

    // const electionRankSize = await genesisEdenUtil.getRanks()
    // const membersCompleteDataPromise = allMembers.map(async member => {
    //   // const { rows } = await smartProxyUtil.getVotes(
    //   //   member[1].accountName,
    //   //   member[1].accountName,
    //   //   1
    //   // )
    //   // const voteState = await eosioUtil.getVotingState(member[1]?.account)
    //   return {
    //     ...member
    //     // info: {
    //     //   rank: genesisEdenUtil.classifyMemberRank(
    //     //     member[1].election_rank,
    //     //     electionRankSize.length - 1
    //     //   )
    //     // }
    //     // vote: {
    //     //   state: voteState,
    //     //   amount: rows.length > 0 ? rows[0]?.producers.length : 0
    //     // }
    //   }
    // })
    // // const membersCompleteData = await Promise?.all(membersCompleteDataPromise)
    // console.log('🚀 ~ loadMembers ~ membersCompleteData', membersCompleteData)
    setEdenMembers(allMembers)
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

  // useEffect(() => {
  //   setEdenMembers(allMembers)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [allMembers])

  return (
    <div className={classes.container}>
      {allMembers.map(delegate => (
        <DelegateItem
          key={delegate.profile.name}
          actionItemStyles={classes.itemActionStyle}
          text={
            delegate?.vote?.state !== eosioUtil.VoteState.ForProxy
              ? delegate?.vote?.state === eosioUtil.VoteState.NoVoting
                ? t('voters.noVoting')
                : t('voters.voteByOther')
              : `${t('voters.voteFor')} ${String(delegate?.vote?.amount)} `
          }
          name={delegate.profile.name}
          imgChild={
            <ImgLoading
              classes={classes.avatar}
              img={delegate.profile.image.cid}
              defaultImg='/icons/spinner.gif'
            />
          }
          bgColor='#fff'
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
          profileLink={`https://genesis.eden.eoscommunity.org/members/${delegate.accountName}`}
          targetProfile='_blank'
          positionText={`${delegate?.info?.rank?.label} - Vote Weight: ${delegate?.info?.rank?.voteWeight}`}
        />
      ))}
      {loadingData && (
        <div className={classes.loadMoreContainer}>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default Body
