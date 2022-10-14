import { eosApi } from './eos'
import { sdkConfig } from 'config'

export const hasVoteForProxy = async (account: string): Promise<boolean> => {
  const { rows } = await eosApi.getTableRows({
    code: sdkConfig.eosioContract,
    scope: sdkConfig.eosioContract,
    table: 'voters',
    lower_bound: account,
    uppper_bound: account,
    json: true,
    limit: 1
  })

  return rows.length && rows[0].proxy === sdkConfig.edenSmartProxyContract
}

export const getTotalEosVoteDelegate = async (): Promise<number> => {
  const { rows } = await eosApi.getTableRows({
    code: sdkConfig.eosioContract,
    scope: sdkConfig.eosioContract,
    table: 'voters',
    lower_bound: sdkConfig.edenSmartProxyContract,
    uppper_bound: sdkConfig.edenSmartProxyContract,
    json: true,
    limit: 1
  })

  return rows?.staked || 0
}
