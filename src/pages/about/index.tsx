import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { Link, Typography } from '@mui/material'

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
        <br />
        <Typography variant='body2'>{t('about.whatIsEden')}</Typography>
        <Typography variant='subtitle1'>
          {t('about.edenDescription')}
        </Typography>
        <br />
        <Typography variant='body2'>{t('about.intention')}</Typography>
        <Typography variant='subtitle1'>
          {t('about.intentionDescription')}
        </Typography>
        <br />
        <Typography variant='body2'>{t('about.howDoesWork')}</Typography>
        <Typography variant='subtitle1'>
          {t('about.howDoesWorkDescription')}
        </Typography>
        <div className={classes.paddingBulletPoint}>
          <Typography variant='subtitle1'>{`• ${t(
            'about.point1'
          )}`}</Typography>
          <Typography variant='subtitle1'>{`• ${t(
            'about.point2'
          )}`}</Typography>
          <Typography variant='subtitle1'>{`• ${t(
            'about.point3'
          )}`}</Typography>
        </div>
        <Typography variant='subtitle1' fontStyle='italic'>
          {t('about.note')}
        </Typography>
        <Typography variant='subtitle1'>
          {t('about.howDoesWorkDescription2')}
        </Typography>
        <br />
        <Typography variant='body2'>{t('about.whatMyvoteEOS')}</Typography>
        <Typography variant='subtitle1'>
          {t('about.whatMyvoteEOSDescription')}
        </Typography>
        <div className={classes.paddingBulletPoint}>
          <Typography variant='subtitle1'>{`• ${t(
            'about.whatMyvoteEOSPoint1'
          )}`}</Typography>
          <Typography variant='subtitle1'>{`• ${t(
            'about.whatMyvoteEOSPoint2'
          )}`}</Typography>
          <Typography variant='subtitle1'>{`• ${t(
            'about.whatMyvoteEOSPoint3'
          )}`}</Typography>
        </div>
        <Typography variant='subtitle1'>
          {t('about.whatMyvoteEOSDescription2')}
        </Typography>
        <Typography variant='subtitle1'>
          {t('about.whatMyvoteEOSDescription3')}
        </Typography>
        <br />
        <Typography variant='subtitle2' fontWeight='bold'>
          {t('about.joinDiscussion')}
          <Link
            href='https://www.t.me/edensmartproxy'
            fontWeight='normal'
            target='_blank'
            rel='noreferrer'
          >
            {' '}
            https://www.t.me/edensmartproxy
          </Link>
        </Typography>
        <Typography variant='subtitle2' fontWeight='bold'>
          {t('about.github')}{' '}
          <Link
            href='https://www.github.com/'
            fontWeight='normal'
            target='_blank'
            rel='noreferrer'
          >
            {' '}
            https://www.github.com/
          </Link>
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
