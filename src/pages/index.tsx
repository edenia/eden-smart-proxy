import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { HomeHead, HomeBody, HomeBottom } from 'components'
import bgImage from '/public/images/bg-home.png'
import { routeUtils } from 'utils'
import i18nUtils from 'utils/i18n'

import useStyles from './styles'

const Home: NextPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <NextSeo title={t('home.homeMetaTitle')} />
      <div className={classes.containerPage}>
        <div className={classes.backgroundContainer}>
          <Image
            src={bgImage}
            alt='Backgound image'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className={classes.contentPage}>
          <HomeHead />
          <HomeBody />
          <HomeBottom />
        </div>
      </div>
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

export default Home
