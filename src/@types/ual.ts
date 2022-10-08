export interface IChain {
  chainId: string
  rpcEndpoints: IRpcEndpoint[]
}

export interface IRpcEndpoint {
  protocol: string
  host: string
  port: number
  path?: string
}

export type UALType = {
  appName: string
  chains: IChain[]
  authenticators: Array<any>
}

export type UALStateType = {
  activeUser: any
  activeAuthenticator: any
  users: Array<any> // create user type
  error: any | string
  message: string
  appName?: string
  chains?: IChain[]
  authenticators?: Array<any>
  authenticator?: any
  availableAuthenticators?: Array<any>
}

export type authWithoutLoginType = {
  ual: any
  appName: string
  availableAuthenticators?: Array<any>
  authenticator?: any
  isAutoLogin?: boolean
}
