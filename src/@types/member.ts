export type BodyVoters = {
  searchValue: string | undefined
}

export interface IMembers {
  account: string
  election_participation_status: number
  election_rank: number
  encryption_key: string
  name: string
  nft_template_id: number
  profile: any
  representative: string
  status: number
  vote: {
    account: string
    producers: any
    weight: any
  }
}

export interface IMembersData {
  memberPag: any
  members: IMembers[]
}
