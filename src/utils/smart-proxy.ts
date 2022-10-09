import { eosApi } from './eos'
import { sdkConfig } from 'config'

type VoteType = {
  voter: string
  producers: Array<string>
}

type DelegateVoteType = {
  voter: string
  proxy: string
  producers: Array<string>
}

type DataType = VoteType | DelegateVoteType

type TransactionRequest = {
  actor: string
  action: string
  data: DataType
  contract: string
}

type Transaction = {
  actions: Array<Action>
}

type Action = {
  authorization: Array<Authorization>
  account: string
  name: string
  data: DataType
}

type Authorization = {
  actor: string
  permission: string
}

type TableResponseRow<T> = [string, T] | T

interface TableResponse<T> {
  rows: TableResponseRow<T>[]
  more: boolean
  next_key: string
}

export const buildTransaction = ({
  actor,
  action,
  data,
  contract
}: TransactionRequest): Transaction => {
  return {
    actions: [
      {
        authorization: [
          {
            actor,
            permission: 'active'
          }
        ],
        account: contract,
        name: action,
        data
      }
    ]
  }
}

export const buildDelegateTransaction = (voter: string): Transaction => {
  return buildTransaction({
    actor: voter,
    action: 'voteproducer',
    data: { voter, proxy: sdkConfig.edenSmartProxyContract, producers: [] },
    contract: sdkConfig.eosioContract
  })
}

export const buildVoteTransaction = ({
  voter,
  producers
}: VoteType): Transaction => {
  return buildTransaction({
    actor: voter,
    action: 'vote',
    data: { voter, producers },
    contract: sdkConfig.edenSmartProxyContract
  })
}

export const getVotes = async <T>(
  lowerBound?: string,
  limit = 30
): Promise<any | undefined> => {
  return (await eosApi.getTableRows({
    code: sdkConfig.edenSmartProxyContract,
    scope: sdkConfig.edenSmartProxyContract,
    table: 'votes',
    json: true,
    lower_bound: lowerBound,
    limit
  })) as TableResponse<T>
}

export const getEdenMembers = async <T>(
  lowerBound?: string,
  limit = 100
): Promise<any> => {
  return (await eosApi.getTableRows({
    code: sdkConfig.genesisEdenContract,
    scope: 0,
    table: 'member',
    json: true,
    lower_bound: lowerBound,
    limit
  })) as TableResponse<T>
}

export const getWhitelistedBps = async <T>(
  lowerBound?: string,
  limit = 100
): Promise<any> => {
  return (await eosApi.getTableRows({
    code: sdkConfig.myVoteEOSDaoContract,
    scope: sdkConfig.myVoteEOSDaoContract,
    lower_bound: lowerBound,
    table: 'producer',
    json: true,
    limit
  })) as TableResponse<T>
}

export const getBlacklistedBps = async <T>(): Promise<any> => {
  const { rows } = await eosApi.getTableRows({
    code: sdkConfig.edenSmartProxyContract,
    scope: sdkConfig.edenSmartProxyContract,
    table: 'blacklisted',
    json: true,
    limit: 100
  })

  return rows
}
