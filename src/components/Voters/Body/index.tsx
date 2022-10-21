import { useEffect, useState } from 'react'
import { DelegateItem, Button, Spinner } from '@edenia/ui-kit'
import { useTranslation } from 'next-i18next'
import { gql, useLazyQuery } from '@apollo/client'
import Image from 'next/image'

import ImgLoading from '../../ImageLoad'
import {
  // smartProxyUtil,
  // atomicAssetsUtil,
  // genesisEdenUtil,
  eosioUtil
} from 'utils'
import yesVotingIcon from '/public/icons/yes-voting-icon.png'
import notVotingIcon from '/public/icons/not-voting-icon.png'
import votingOtherIcon from '/public/icons/voting-for-other-icon.png'

import useStyles from './styles'

type BodyVoters = {
  searchValue: string | undefined
}

// test graphql
interface IMembers {
  account: string
  election_participation_status: number
  election_rank: number
  encryption_key: string
  name: string
  nft_template_id: number
  profile: any
  representative: string
  status: number
  vote: {
    account: string
    producers: any
    weight: any
  }
}

interface IMembersData {
  members: IMembers[]
}

const GET_MEMBERS = gql`
  query getMemebers($value: String, $orderBy: [member_order_by!]) {
    member_aggregate(
      order_by: $orderBy
      where: {
        _or: [{ account: { _like: $value } }, { name: { _like: $value } }]
      }
    ) {
      aggregate {
        count
      }
    }
    member(
      order_by: $orderBy
      where: {
        _or: [{ account: { _like: $value } }, { name: { _like: $value } }]
      }
    ) {
      account
      election_participation_status
      election_rank
      encryption_key
      name
      nft_template_id
      profile
      representative
      status
      vote {
        account
        producers
        weight
      }
    }
  }
`
// end test graphql

const Body: React.FC<BodyVoters> = ({ searchValue }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  // const [loadingData, setLoadingData] = useState<boolean>(true)
  const [edenMembers, setEdenMembers] = useState<any>([])
  const [currentEdenMembers, setCurrentEdenMembers] = useState<any>([])
  const [getMembers, { loading, data }] =
    useLazyQuery<IMembersData>(GET_MEMBERS)

  console.log({ loading, data })

  // const loadMembers = async nextKey => {
  //   setLoadingData(true)
  //   const members = await smartProxyUtil.getEdenMembers(
  //     nextKey === '' ? undefined : nextKey,
  //     50
  //   )

  //   if (members) {
  //     const activeMembers = members?.rows?.filter(
  //       member => member[1]?.status === 1
  //     )
  //     const electionRankSize = await genesisEdenUtil.getRanks()
  //     const membersCompleteDataPromise = activeMembers.map(async member => {
  //       const { rows } = await smartProxyUtil.getVotes(
  //         member[1]?.account,
  //         member[1]?.account,
  //         1
  //       )

  //       const memberInfo = await atomicAssetsUtil.getTemplate(
  //         member[1]?.nft_template_id
  //       )

  //       const voteState = await eosioUtil.getVotingState(member[1]?.account)

  //       return {
  //         ...member,
  //         info: {
  //           ...memberInfo,
  //           rank: genesisEdenUtil.classifyMemberRank(
  //             member[1].election_rank,
  //             electionRankSize.length - 1
  //           )
  //         },
  //         next_key: members.next_key,
  //         vote: {
  //           state: voteState,
  //           amount: rows.length > 0 ? rows[0]?.producers.length : 0
  //         }
  //       }
  //     })
  //     const membersCompleteData = await Promise?.all(membersCompleteDataPromise)
  //     setEdenMembers([...edenMembers, ...membersCompleteData])
  //   }
  //   setLoadingData(false)
  // }

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
    getMembers({
      variables: {
        value: '%pe%',
        orderBy: [
          {
            vote: {
              weight: 'asc'
            }
          }
        ]
      }
    })
  }, [getMembers])

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
          imgChild={
            <ImgLoading classes={classes.avatar} img={delegate?.info?.image} />
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
          profileLink={`https://genesis.eden.eoscommunity.org/members/${delegate[1]?.account}`}
          targetProfile='_blank'
          positionText={`${delegate?.info?.rank?.label} - ${t(
            'voters.voteWeight'
          )}: ${delegate?.info?.rank?.voteWeight}`}
        />
      ))}
      {/* {loadingData && (
        <div className={classes.loadMoreContainer}>
          <Spinner />
        </div>
      )} */}
      {edenMembers[edenMembers?.length - 1]?.next_key !== '' && (
        <div className={classes.loadMoreContainer}>
          <Button
            label={t('loadMore')}
            variant='secondary'
            onClick={() =>
              // loadMembers(edenMembers[edenMembers.length - 1].next_key)
              console.log('test')
            }
          />
        </div>
      )}
    </div>
  )
}

export default Body
