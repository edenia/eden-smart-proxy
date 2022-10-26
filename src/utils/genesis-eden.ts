import { StaticImageData } from 'next/image'

import { sdkConfig } from 'config'
import yesVotingIcon from '/public/icons/yes-voting-icon.png'
import notVotingIcon from '/public/icons/not-voting-icon.png'
import votingOtherIcon from '/public/icons/voting-for-other-icon.png'

import { eosApi } from './eos'

enum RankType {
  Member,
  N,
  Chief,
  HeadChief
}

enum BadgeLink {
  Delegate = '/icons/chiefdelegate-icon.png',
  N = '/icons/lv1-icon.png'
}

export interface MemberStats {
  active_members: number
  pending_members: number
  completed_waiting_inductions: number
  ranks: number[]
}

interface MemberClassification {
  memberType: RankType
  label: string
  badge?: string
  voteWeight: string
}

interface MemberVoteInfo {
  proxy: string
  producers: Array<string>
  votedProducer: Array<string>
}

export const getRanks = async <T = any>(): Promise<T> => {
  const { rows } = await eosApi.getTableRows({
    code: sdkConfig.genesisEdenContract,
    scope: 0,
    table: 'memberstats',
    json: true,
    limit: 1
  })

  return rows.length ? rows[0][1].ranks : []
}

export const getLastElectionDate = async <T = any>(): Promise<T> => {
  const { rows } = await eosApi.getTableRows({
    code: sdkConfig.genesisEdenContract,
    scope: 0,
    table: 'elect.state',
    json: true,
    limit: 1
  })

  return rows.length ? rows[0][1]?.last_election_time : undefined
}

export const classifyMemberRank = (
  rank: number,
  electionRankSize: number
): MemberClassification => {
  let memberType = 0
  let label: string
  let badge: any = undefined
  let voteWeight = '1'

  console.log({ electionRankSize, rank })

  switch (true) {
    case rank === electionRankSize:
      memberType = RankType.HeadChief
      badge = BadgeLink.Delegate
      break

    case rank === electionRankSize - 1:
      memberType = RankType.Chief
      badge = BadgeLink.Delegate
      break

    case rank !== 0:
      memberType = RankType.N
      badge = BadgeLink.N

      break

    default:
      memberType = RankType.Member
      break
  }

  switch (true) {
    case RankType.Member === memberType:
      label = 'Member'
      voteWeight = '1'
      break

    case RankType.N === memberType:
      label = `Level ${rank} Delegate`
      voteWeight = '4'
      break

    case RankType.Chief === memberType:
      label = 'Chief Delegate'
      voteWeight = '16'

      break

    default:
      label = 'Head Chief Delegate'
      voteWeight = '16'
      break
  }

  return {
    memberType,
    label,
    badge,
    voteWeight
  }
}

export const getVotingState = (
  data: MemberVoteInfo
): { img: StaticImageData; label: string; aditionalInfo?: number } => {
  if (!data?.proxy && !data?.producers?.length)
    return { img: notVotingIcon, label: 'voters.noVoting' }

  if (data.proxy === sdkConfig.edenSmartProxyContract)
    return {
      img: yesVotingIcon,
      label: 'voters.voteFor',
      aditionalInfo: data.votedProducer.length
    }

  return { img: votingOtherIcon, label: 'voters.voteByOther' }
}
