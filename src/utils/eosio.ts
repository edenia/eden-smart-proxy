import { eosApi } from './eos'
import { sdkConfig } from 'config'

export enum VoteState {
  NoVoting,
  ForOther,
  ForProxy
}

const getMemberVotes = async <T = any>(account: string): Promise<T> => {
  const { rows } = await eosApi.getTableRows({
    code: sdkConfig.eosioContract,
    scope: sdkConfig.eosioContract,
    table: 'voters',
    lower_bound: account,
    uppper_bound: account,
    json: true,
    limit: 1
  })

  return rows[0]
}

export const getVotingState = async (account: string): Promise<VoteState> => {
  const vote = await getMemberVotes(account)

  if (!vote?.proxy && !vote?.producers?.length) return VoteState.NoVoting

  return vote.proxy === sdkConfig.edenSmartProxyContract
    ? VoteState.ForProxy
    : VoteState.ForOther
}

export const getTotalEosVoteDelegate = async (): Promise<number> => {
  const response = await fetch(
    'https://www.alohaeos.com/vote/proxy/edensmartprx?output=json',
    {
      method: 'GET'
    }
  )

  return (await response.json())?.proxy?.proxied_vote_eos || 0
}
