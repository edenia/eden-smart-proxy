# Smart Proxy
This Smart Contract acts as a proxy to help members from Eden Community to rank their most valuable bps leaving their vote on `edenbpsproxy` account.

## Prerequisites
- Members need to give their vote to `edenbpsproxy` account voting with the `voteproducer` action from `eosio`.

## Description
The Smart Contract actions are:
- vote: Vote for a list of bps.
- rmvote: Remove a vote and decrease the bp weight.
- proxyvote: Counts the first 30 most weighted bps to vote for.
- refreshvotes: Update the weight of the eden members and the bp weight.
- clearall: For development purposes, clears all table records.

### Smart Contracts Integrations
- myvoteeosdao: To check for whitelisted bps.
- genesis.eden: To check for active members and their respective ranks.

### `vote`
The following is a list of consideration about how the `vote` action works:
- An Eden member votes for a list of block producers.
- The Smart Contract checks for voter authorization.
- The Smart Contract checks if the voter is an active Eden Member.
- The Smart Contract checks if all the voted bps are ordered alphabetically and whitelisted in the `myvoteeosdao` contract.
- The voter gets a fibonacci weight according to their `rank + 1`, for example, if the voter rank is `0`, then, the fibonacci weight value for `fib(rank + 1) = fib(0 + 1)` is 1.
- The Smart Contract assigns the weight to the voter and for each bp the voter voted. If the voter decides to vote for a new list of bps which exclude an old one, then the excluded bps are going to get a weight deduction of the old voter weight. If the voter decides to vote again for the same bps, the smart contract will keep their value as long as the voter rank hasn't changed, if the rank have changed the smart contract will remove the old value and will add the new weight. If the new weight takes some bp to a weight of 0, that bp is then removed from the list of bps.

### `rmvote`
The following is a list of consideration about how the `rmvote` action works:
- An Eden member removes their vote.
- The Smart Contract checks if the vote exists.
- The Smart Contract will start removing the voter weight from all the bps that members have voted for, if some of the bps only had that member vote, those bps are going to get removed from the table.

### `proxyvote`
The following is a list of consideration about how the `proxyvote` action works:
- The Smart Contract handler triggers the proxy vote action.
- The Smart Contract checks for the handler authorization.
- The Smart Contract excludes the bps that could have become inactive.
- The Smart Contract checks after the bps exclusion at least 1 bp exists to vote for.
- The Smart Contract sorts the bps by most weighted bps.
- The Smart Contract takes the first 30 higher weighted bps.
- The Smart Contract sorts the bps by name alphabetically.
- The Smart Contract calls the `voteproducer` action from the `eosio` account.

### `refreshvotes`
This action is created with the purpose of updating the weight of each voter member after each election occurs.
The following is a list of consideration about how the `refreshvotes` action works:
- The Smart Contract handler triggers the refresh votes action.
- The Smart Contract get the members information, if the members are not active, the votes are removed, if not, the smart contract continues with the flow.
- The Smart Contract get a fib value considering the member rank, if their rank has changed, their vote weight is updated and all the voted bps gets their weight updated. If the voter rank is the same, there is no value to refresh.

### `clearall`
The following is a list of consideration about how the `clearall` action works:
- The Smart Contract handler triggers the refresh votes action.
- The Smart Contract checks for the handler authorization.
- The Smart Contract removes all the votes and bps weights from the tables.
