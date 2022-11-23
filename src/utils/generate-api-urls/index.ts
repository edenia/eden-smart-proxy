type getContactFormUrlClientProps = {
  bps: string
}

export const getEosRateAPIUrlClient = ({
  bps
}: getContactFormUrlClientProps): string => `/api/eosrate-api/?&bps=${bps}`
