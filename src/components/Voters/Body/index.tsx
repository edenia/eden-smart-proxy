import { useEffect, useState, useCallback } from 'react'
import { DelegateItem, Button, Spinner } from '@edenia/ui-kit'
import { useTranslation } from 'next-i18next'
import { useLazyQuery } from '@apollo/client'
import Image from 'next/image'

import ImgLoading from '../../ImageLoad'
import { GET_MEMBERS } from '../../../gql/voters.gql'
import { BodyVoters, IMembersData } from '../../../@types/member'
import { genesisEdenUtil, eosioUtil } from 'utils'
import yesVotingIcon from '/public/icons/yes-voting-icon.png'
import notVotingIcon from '/public/icons/not-voting-icon.png'
import votingOtherIcon from '/public/icons/voting-for-other-icon.png'

import useStyles from './styles'

const Body: React.FC<BodyVoters> = ({ searchValue = '' }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [rankSize, setRankSizes] = useState<any>(null)
  const [limit, setLimit] = useState<number>(50)
  const [sortBy] = useState<any>({
    value: {
      vote: {
        weight: 'desc_nulls_last'
      }
    },
    sortName: 'weight'
  })
  const [edenMembers, setEdenMembers] = useState<any>([])
  const [getMembers, { loading, data }] =
    useLazyQuery<IMembersData>(GET_MEMBERS)

  const handlerLoadMore = () => {
    setLimit(curr => curr + 50)
  }

  const getElectionRankSize = useCallback(async () => {
    const electionRankSize = await genesisEdenUtil.getRanks()

    setRankSizes(electionRankSize)
  }, [])

  const validationElement = useCallback(
    data => {
      const members = (data || []).map(member => {
        const rank = genesisEdenUtil.classifyMemberRank(
          member.election_rank,
          rankSize.length - 1
        )

        return { ...member, rank }
      })

      return members
    },
    [rankSize]
  )

  useEffect(() => {
    getMembers({
      variables: {
        limit,
        value: `%${searchValue}%`,
        orderBy: [sortBy.value]
      }
    })
    getElectionRankSize()
  }, [getMembers, getElectionRankSize, sortBy, limit, searchValue])

  useEffect(() => {
    if (rankSize?.length && data) {
      const members = validationElement(data?.members || [])
      setEdenMembers(members)
    }
  }, [rankSize, data, setEdenMembers, validationElement])

  return (
    <div className={classes.container}>
      {edenMembers?.map(delegate => (
        <DelegateItem
          key={delegate.name}
          actionItemStyles={classes.itemActionStyle}
          text={
            delegate?.vote?.state !== eosioUtil.VoteState.ForProxy
              ? delegate?.vote?.state === eosioUtil.VoteState.NoVoting
                ? t('voters.noVoting')
                : t('voters.voteByOther')
              : `${t('voters.voteFor')} ${String(delegate?.vote?.amount)} `
          }
          name={delegate.name}
          imgChild={
            <ImgLoading
              classes={classes.avatar}
              img={delegate?.profile?.image}
              defaultImg={undefined}
            />
          }
          bgColor='#fff'
          target='_blank'
          link={`https://bloks.io/account/edensmartprx?loadContract=true&tab=Tables&table=votes&account=edensmartprx&scope=edensmartprx&limit=1&lower_bound=${delegate[1]?.account}&upper_bound=${delegate[1]?.account}`}
          linkIcon={
            delegate?.vote?.state === eosioUtil.VoteState.ForProxy &&
            '/icons/ref-icon.png'
          }
          avatarIcon={delegate?.rank?.badge}
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
          profileLink={`https://genesis.eden.eoscommunity.org/members/${delegate?.account}`}
          targetProfile='_blank'
          positionText={`${delegate?.rank?.label} - ${t(
            'voters.voteWeight'
          )}: ${delegate?.rank?.voteWeight}`}
        />
      ))}
      {loading && (
        <div className={classes.loadMoreContainer}>
          <Spinner />
        </div>
      )}
      {data?.memberPag?.aggregate.count > limit && (
        <div className={classes.loadMoreContainer}>
          <Button
            label={t('loadMore')}
            variant='secondary'
            onClick={handlerLoadMore}
          />
        </div>
      )}
    </div>
  )
}

export default Body
