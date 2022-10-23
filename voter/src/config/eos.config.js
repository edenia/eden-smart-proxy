module.exports = {
  endpoint: process.env.EOS_API_ENDPOINT,
  chainId: process.env.EOS_API_CHAIN_ID,
  voterAccount: process.env.EOS_VOTER_ACCOUNT,
  votePerms: process.env.EOS_VOTER_PERMISSION,
  pvtKey: process.env.EOS_VOTER_PRIVATE_KEY,
  proxyAccount: process.env.EOS_PROXY_ACCOUNT
}
