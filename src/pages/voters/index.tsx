import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

import { routeUtils } from 'utils'
import i18nUtils from 'utils/i18n'
import { VotersHead, VotersBody } from 'components'

const Voters: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo title={t('votersMetaTitle')} />
      <VotersHead />
      <VotersBody />
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
