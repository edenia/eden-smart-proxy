import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import { routeUtils } from 'utils'
import i18nUtils from 'utils/i18n'

import useStyles from './styles'

const About: NextPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <NextSeo title={t('about.votersMetaTitle')} />
      <div className={classes.container}>
        <Typography variant='body2'>{t('about.whatIsEden')}</Typography>
        <Typography variant='subtitle1'>
          {t('about.edenDescription')}
        </Typography>
        <br />
        <Typography variant='body2'>{t('about.whitelistWork')}</Typography>
        <Typography variant='subtitle1'>
          {t('about.whitelistDescription')}
        </Typography>
        <Typography variant='subtitle1'>{t('about.question1')}</Typography>
        <Typography variant='subtitle1'>{t('about.question2')}</Typography>
        <Typography variant='subtitle1'>{t('about.question3')}</Typography>
        <Typography variant='subtitle1'>{t('about.question4')}</Typography>
        <br />
        <Typography variant='subtitle1'>{t('about.disclaimer')}</Typography>
        <Typography variant='subtitle1'>{`• ${t('about.point1')}`}</Typography>
        <Typography variant='subtitle1'>{`• ${t('about.point2')}`}</Typography>
        <Typography variant='subtitle1'>{`• ${t('about.point3')}`}</Typography>
        <br />
        <Typography variant='body2'>{t('about.shouldVote')}</Typography>
        <Typography variant='subtitle1'>
          {t('about.shouldVoteResponse')}
        </Typography>
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

export default About
