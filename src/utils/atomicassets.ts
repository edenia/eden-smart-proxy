import { ExplorerApi } from 'atomicassets'
import { sdkConfig } from 'config'

const api = new ExplorerApi('https://jungle-aa.edenia.cloud', 'atomicassets', {
  fetch: require('node-fetch')
})

interface ProfileImage {
  cid: string
  url: string
  attributions: string
}

export interface MemberSocialHandles {
  eosCommunity?: string
  twitter?: string
  linkedin?: string
  telegram?: string
  facebook?: string
  blog?: string
}

interface MemberProfile {
  name: string
  image: ProfileImage
  bio: string
  social: MemberSocialHandles
}

export const getTemplate = async (
  templateId: number
): Promise<MemberProfile | undefined> => {
  const { immutable_data } = await api.getTemplate(
    sdkConfig.genesisEdenContract,
    templateId.toString()
  )

  return {
    name: immutable_data.name,
    image: immutable_data.img,
    bio: immutable_data.bio,
    social: JSON.parse(immutable_data.social)
  }
}

export const getTemplates = async (page = 1, limit = 100): Promise<any[]> => {
  const templates = await api.getTemplates(
    {
      collection_name: sdkConfig.genesisEdenContract
    },
    page,
    limit
  )
  console.log({ templates })
  return templates.map(({ immutable_data }) => ({
    account: immutable_data.account,
    name: immutable_data.name,
    image: immutable_data.img,
    bio: immutable_data.bio,
    social: JSON.parse(immutable_data.social)
  }))
}
