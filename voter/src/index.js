const eosUtil = require('./utils/eos.util')
const { eosConfig } = require('./config')

const proxyAccount = eosConfig.proxyAccount
const voter = eosConfig.voterAccount
const votePerms = eosConfig.votePerms

async function init() {
  let retry = true
  try {
    while ( retry ) {
      console.log('Calling proxyvote action on Smart Proxy Account:', proxyAccount)

      const transact = await eosUtil
        .transact([
          {
            account: proxyAccount,
            name: 'proxyvote',
            authorization: [{ actor: voter, permission: votePerms }],
            data: ''
          }
        ])
        .catch(er => {
          retry = false
          console.log(er.toString())
        })

      if (transact) {console.log(transact)}
      
    }
  } catch (error) {
    console.error(error)
  }
}
init()
