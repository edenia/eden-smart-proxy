export const endpoint = `${process.env.NEXT_PUBLIC_UAL_API_PROTOCOL}://${
  process.env.NEXT_PUBLIC_UAL_API_HOST
}${process.env.NEXT_PUBLIC_UAL_API_PORT ? ':' : ''}${
  process.env.NEXT_PUBLIC_UAL_API_PORT
}`

export const atomicassetsEndpoint =
  process.env.NEXT_PUBLIC_AA_API_HOST || 'https://jungle-aa.edenia.cloud'

export const eosioContract = 'eosio'

export const genesisEdenContract =
  process.env.NEXT_PUBLIC_GENESISEDEN_CONTRACT || 'genesis.eden'

export const edenSmartProxyContract =
  process.env.NEXT_PUBLIC_EDENSMARTPROXY_CONTRACT || 'edensmartprx'

export const myVoteEOSDaoContract =
  process.env.NEXT_PUBLIC_MYVOTEEOSDAO_CONTRACT || 'myvoteeosdao'

export const eosioTokenContract =
  process.env.NEXT_PUBLIC_TOKEN_CONTRACT || 'eosio.token'

export const aaContract = process.env.NEXT_PUBLIC_AA_CONTRACT || 'atomicassets'

export const aaMarketContract =
  process.env.NEXT_PUBLIC_AA_MARKET_CONTRACT || 'atomicmarket'

export const subchainWasmUrl =
  process.env.NEXT_PUBLIC_SUBCHAIN_WASM_URL ||
  'https://edenbox.eoscommunity.org/v1/subchain/eden-micro-chain.wasm'

export const subchainStateUrl =
  process.env.NEXT_PUBLIC_SUBCHAIN_STATE_URL ||
  'https://edenbox.eoscommunity.org/v1/subchain/state'

export const subchainWsUrl =
  process.env.NEXT_PUBLIC_SUBCHAIN_WS_URL ||
  'ws://edenbox.eoscommunity.org/v1/subchain/eden-microchain'

export const subchainSlowMo =
  process.env.NEXT_PUBLIC_SUBCHAIN_SLOW_MO === 'true'
