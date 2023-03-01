import { Anchor } from 'ual-anchor'

const rpcEndpoint = `${process.env.NEXT_PUBLIC_UAL_API_PROTOCOL}://${
  process.env.NEXT_PUBLIC_UAL_API_HOST
}${process.env.NEXT_PUBLIC_UAL_API_PORT ? ':' : ''}${
  process.env.NEXT_PUBLIC_UAL_API_PORT
}`
const appName = process.env.NEXT_PUBLIC_UAL_APP_NAME || 'app'
const network: any = {
  chainId: process.env.NEXT_PUBLIC_UAL_CHAIN_ID || '',
  rpcEndpoints: [
    {
      protocol: process.env.NEXT_PUBLIC_UAL_API_PROTOCOL || '',
      host: process.env.NEXT_PUBLIC_UAL_API_HOST || '',
      port: parseInt(process.env.NEXT_PUBLIC_UAL_API_PORT || '')
    }
  ]
}
const authenticators = [new Anchor([network], { appName, verifyProofs: true })]
const rewardAccount = 'eosproxyrwds'

export default { rpcEndpoint, authenticators, appName, network, rewardAccount }
