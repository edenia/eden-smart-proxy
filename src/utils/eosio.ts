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
