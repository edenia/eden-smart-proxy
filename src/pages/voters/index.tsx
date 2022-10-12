import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

import { routeUtils } from 'utils'
import i18nUtils from 'utils/i18n'
import { VotersHead, VotersBody } from 'components'
import { useState } from 'react'

const Voters: NextPage = () => {
  const { t } = useTranslation()
  const [searchInput, setSearchInput] = useState<string | undefined>()

  return (
    <>
      <NextSeo title={t('voters.votersMetaTitle')} />
      <VotersHead setSearchInput={setSearchInput} />
      <VotersBody searchValue={searchInput} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = routeUtils.getAsString(context.locale)
  const translations = await i18nUtils.getServerSideTranslations(locale)

  return {
    props: {
      ...translations
    }
  }
}

export default Voters
