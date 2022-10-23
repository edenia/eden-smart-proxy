const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const { fetch } = require('node-fetch')
const { TextEncoder, TextDecoder } = require('util')
const EosApi = require('eosjs-api')

const { eosConfig } = require('./../config')

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

const rpc = new JsonRpc(eosConfig.endpoint, { fetch })

const eosApi = EosApi({
  httpEndpoint: eosConfig.endpoint,
  verbose: false,
  fetchConfiguration: {}
})

const transact = async actions => {
  try {
    const keys = [eosConfig.pvtKey]

    const api = new Api({
      rpc,
      textDecoder,
      textEncoder,
      chainId: eosConfig.chainId,
      signatureProvider: new JsSignatureProvider(keys)
    })

    const transaction = await api.transact(
      {
        actions
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )

    return transaction
  } catch (error) {
    throw new Error(
      error.message.replace(/assertion failure with message: /gi, '')
    )
  }
}

module.exports = {
  transact
}
