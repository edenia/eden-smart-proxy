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
