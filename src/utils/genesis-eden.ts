import { eosApi } from './eos'
import { sdkConfig } from 'config'

enum RankType {
  Member,
  N,
  Chief,
  HeadChief
}

enum BadgeLink {
  Delegate = '/icons/chiefdelegate-icon.png',
  N = '/icons/circle-icon.png'
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
  const memberType =
    rank === electionRankSize
      ? RankType.HeadChief
      : rank === electionRankSize - 1
      ? RankType.Chief
      : rank !== 0
      ? RankType.N
      : RankType.Member
  const label =
    RankType.Member === memberType
      ? 'Member'
      : RankType.N === memberType
      ? `Level ${rank} Delegate`
      : RankType.Chief === memberType
      ? 'Chief Delegate'
      : 'Head Chief Delegate'

  return {
    memberType,
    label,
    badge:
      memberType === RankType.Chief || memberType === RankType.HeadChief
        ? BadgeLink.Delegate
        : memberType === RankType.N
        ? BadgeLink.N
        : undefined
  }
}
