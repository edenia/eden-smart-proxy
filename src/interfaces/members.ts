// replicates our contract election participation status, see /contracts/eden/include/members.hpp
export enum ElectionParticipationStatus {
  NotInElection = 0,
  InElection
}

// it needs to replicate our contract status, see /contracts/eden/include/members.hpp
export enum MemberStatus {
  PendingMembership = 0,
  ActiveMember
}

export interface Asset {
  quantity: number // integer without decimals
  symbol: string
  precision: number
}

export type VoteDataQueryOptionsByField = {
  fieldName?: string
  fieldValue: string
}

interface ProfileImage {
  cid: string
  url: string
  attributions: string
}

interface InductionVideo {
  cid: string
  url: string
}

interface MemberProfile {
  name: string
  image: ProfileImage
  bio: string
  socialHandles: MemberSocialHandles
}

export interface MemberSocialHandles {
  eosCommunity?: string
  twitter?: string
  linkedin?: string
  telegram?: string
  facebook?: string
  blog?: string
}

export interface Member {
  createdAt: number
  accountName: string
  profile: MemberProfile
  inductionVideo: InductionVideo
  encryptionKey?: string // Include once exposed (as optional)
  // Member's participation status is updated once they lose a round (updated as soon as a new value is known),
  // ie. a member's opt-in participation status lifetime is only from the start of Round 1
  // until the end of the Round they lose (or end of the election)
  participatingInElection: boolean
  delegateRank?: number // Include once exposed
  representativeAccountName?: string // Include once exposed
}

export interface EdenMember {
  account: string
  name: string
  status: MemberStatus
  nft_template_id: number
  encryption_key?: string
  // Member's participation status is updated once they lose a round (updated as soon as a new value is known),
  // ie. a member's opt-in participation status lifetime is only from the start of Round 1
  // until the end of the Round they lose (or end of the election)
  election_participation_status: ElectionParticipationStatus
  election_rank: number
  // A member's representative field is set as soon as it is known. It is left at the old value until then.
  // For members who do participate (opted-in to the election), this is when a round that they do not win is processed.
  // For members who do not participate (opted-out of the election), it is during election setup, ie. when the first round groups are created.
  // Representative field is reset at start of first round for those who are opted out of the election (to zzzzzzzzzzzzj)
  representative: string
}

export interface MemberStats {
  active_members: number
  pending_members: number
  completed_waiting_inductions: number
  // NOTE: ranks is set to [] at start of election and has a new entry added at the end of each round
  ranks: any[]
}

/*********************************
 * MEMBER GRAPHQL QUERY INTERFACES
 ********************************/
export interface MembersQuery {
  members: {
    edges: {
      node: MembersQueryNode
    }[]
  }
}

export interface MembersQueryNode {
  createdAt: string
  account: string
  profile: {
    name: string
    img: string
    attributions: string
    social: string
    bio: string
  }
  inductionVideo: string
  participating: boolean
}
