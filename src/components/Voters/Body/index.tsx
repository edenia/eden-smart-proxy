import { useEffect, useState, useCallback } from 'react'
import { DelegateItem, Button, Spinner } from '@edenia/ui-kit'
import { useTranslation } from 'next-i18next'
import { useLazyQuery } from '@apollo/client'
import Image from 'next/image'

import ImgLoading from '../../ImageLoad'
import { GET_MEMBERS_DATA } from '../../../gql/voters.gql'
import { BodyVoters, IMembersData } from '../../../@types/member'
import { genesisEdenUtil } from 'utils'
import telegramLogo from '/public/icons/telegram-grey-icon.png'

import useStyles from './styles'

const Body: React.FC<BodyVoters> = ({ searchValue = '' }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [rankSize, setRankSizes] = useState<any>(null)
  const [limit, setLimit] = useState<number>(50)
  const [sortBy] = useState<any>({
    value: {
      election_rank: 'desc'
    }
  })
  const [edenMembers, setEdenMembers] = useState<any>([])
  const [getMembers, { loading, data }] =
    useLazyQuery<IMembersData>(GET_MEMBERS_DATA)

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

        const voteState = genesisEdenUtil.getVotingState({
          proxy: member?.eosioVoters?.proxy || null,
          producers: member?.eosioVoters?.producers || [],
          votedProducer: member?.vote?.producers || []
        })

        return { ...member, rank, voteState }
      })

      return members
    },
    [rankSize]
  )

  const formatTelegramUserId = telegram => {
    return telegram?.replace(
      telegram?.includes('https://t.me/') ? 'https://t.me/' : '@',
      ''
    )
  }

  useEffect(() => {
    getMembers({
      variables: {
        limit,
        value: `%${searchValue}%`,
        orderBy: sortBy.value
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
      {edenMembers?.map((delegate, index) => (
        <DelegateItem
          key={index}
          actionItemStyles={classes.itemActionStyle}
          text={`${t(delegate.voteState.label)} ${
            delegate.voteState.aditionalInfo || ''
          }`}
          name={delegate.name}
          imgChild={
            <ImgLoading
              classes={classes.avatar}
              img={delegate?.profile?.image}
            />
          }
          bgColor='#fff'
          target='_blank'
          link={`${process.env.NEXT_PUBLIC_EDEN_BLOCK_EXPLORER_URL}/account/edensmartprx?loadContract=true&tab=Tables&table=votes&account=edensmartprx&scope=edensmartprx&limit=1&lower_bound=${delegate?.account}&upper_bound=${delegate?.account}`}
          linkIcon={
            delegate?.voteState?.label === 'voters.voteFor' &&
            '/icons/ref-icon.png'
          }
          avatarIcon={delegate?.rank?.badge}
          headItem={<Image src={delegate.voteState?.img} />}
          selectableItems={
            <div className={classes.selectableItemsBox}>
              <Image src={telegramLogo} height={14} width={14} />
              <a
                className={classes.aStyle}
                href={`https://www.t.me/${formatTelegramUserId(
                  delegate?.profile?.social?.telegram
                )}`}
                rel='noreferrer'
                target='_blank'
              >
                {formatTelegramUserId(delegate?.profile?.social?.telegram)}
              </a>
            </div>
          }
          profileLink={`${process.env.NEXT_PUBLIC_EDEN_MEMBER_URL}${delegate?.account}`}
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
