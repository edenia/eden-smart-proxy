const ipfsBaseUrl = 'https://eden-genesis.mypinata.cloud/ipfs'

export const ipfsUrl = (ipfsHash: string): string =>
  `${ipfsBaseUrl}/${ipfsHash}`
