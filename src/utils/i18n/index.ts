import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from 'config'

const getServerSideTranslations = (
  locale: string,
  nameSpaces?: string[]
): Promise<SSRConfig> => {
  return serverSideTranslations(locale || i18nConfig.defaultLocale, nameSpaces)
}

export default {
  getServerSideTranslations
}
