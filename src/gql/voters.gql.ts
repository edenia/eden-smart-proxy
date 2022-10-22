import { gql } from '@apollo/client'

export const GET_MEMBERS = gql`
  query getMemebers($value: String, $orderBy: [member_order_by!], $limit: Int) {
    memberPag: member_aggregate(
      order_by: $orderBy
      where: {
        _or: [{ account: { _like: $value } }, { name: { _like: $value } }]
      }
    ) {
      aggregate {
        count
      }
    }
    members: member(
      limit: $limit
      order_by: $orderBy
      where: {
        _or: [{ account: { _like: $value } }, { name: { _like: $value } }]
      }
    ) {
      account
      election_participation_status
      election_rank
      encryption_key
      name
      nft_template_id
      profile
      representative
      status
      vote {
        account
        producers
        weight
      }
    }
  }
`
