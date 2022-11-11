import type { NextPage, GetStaticProps } from 'next'
import { Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { routeUtils } from 'utils'
import i18nUtils from 'utils/i18n'

import useStyles from './styles'

const About: NextPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const router = useRouter()

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
        </div>
        <Typography variant='subtitle1' fontStyle='italic'>
          {t('about.note')}
        </Typography>
        <div className={classes.paddingBulletPoint}>
          <Typography variant='subtitle1' fontStyle='italic'>{`• ${t(
            'about.notePointer1'
          )}`}</Typography>
          <Typography variant='subtitle1' fontStyle='italic'>{`• ${t(
            'about.notePointer2'
          )}`}</Typography>
          <Typography variant='subtitle1' fontStyle='italic'>{`• ${t(
            'about.notePointer3'
          )}`}</Typography>
          <Typography variant='subtitle1' fontStyle='italic'>{`• ${t(
            'about.notePointer4'
          )}`}</Typography>
          <Typography variant='subtitle1' fontStyle='italic'>{`• ${t(
            'about.notePointer5'
          )}`}</Typography>
        </div>
        <br />
        <Typography variant='body2'>
          {t('about.exampleCalculations')}
        </Typography>
        <Typography variant='subtitle1'>
          {t('about.exampleDescription')}
        </Typography>
        <div className={classes.paddingBulletPoint}>
          <Typography variant='subtitle1'>{`• ${t('about.rule1')}`}</Typography>
          <Typography variant='subtitle1'>{`• ${t('about.rule2')}`}</Typography>
          <Typography variant='subtitle1'>{`• ${t('about.rule3')}`}</Typography>
          <p />
          <Typography variant='subtitle1'>{`• ${t('about.rule4')}`}</Typography>
          <Typography variant='subtitle1'>{`• ${t('about.rule5')}`}</Typography>
          <Typography variant='subtitle1'>{`• ${t('about.rule6')}`}</Typography>
        </div>
        <p />
        <Typography variant='subtitle1'>
          {t('about.exampleDescription2')}
        </Typography>
        <Typography variant='subtitle1'>
          {t('about.exampleDescription3')}
        </Typography>
        {router.locale !== 'ko' && (
          <Typography variant='subtitle1'>
            {t('about.exampleDescription4')}
            <a
              className={classes.link}
              href='https://myvoteeos.com/home'
              target='_blank'
              rel='noopener noreferrer'
            >
              MyvoteEOS
            </a>
            {t('about.exampleDescription5')}
          </Typography>
        )}
        <br />
        <Typography variant='body2'>{t('about.whatMyvoteEOS')}</Typography>
        <Typography variant='subtitle1'>
          <a
            className={classes.linkInitial}
            href='https://myvoteeos.com/home'
            target='_blank'
            rel='noopener noreferrer'
          >
            MyvoteEOS
          </a>
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
        <br />

        <Typography variant='body2'>{t('about.roadmap')}</Typography>
        <Typography variant='subtitle1' className={classes.blockDescription}>
          {t('about.roadmapDescription1')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockDescription}>
          {t('about.roadmapDescription2')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockDescription}>
          {t('about.roadmapDescription3')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockDescription}>
          {t('about.roadmapDescription4')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockDescription}>
          {t('about.roadmapDescription5')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockDescription}>
          {t('about.roadmapDescription6')}
        </Typography>
        <div className={classes.paddingBulletPoint}>
          <Typography
            variant='subtitle1'
            className={classes.blockDescription}
          >{`1) ${t('about.roadmapList1')}`}</Typography>
          <Typography
            variant='subtitle1'
            className={classes.blockDescription}
          >{`2) ${t('about.roadmapList2')}`}</Typography>
          <Typography
            variant='subtitle1'
            className={classes.blockDescription}
          >{`3) ${t('about.roadmapList3')}`}</Typography>
        </div>
        <Typography variant='subtitle1' className={classes.blockDescription}>
          {t('about.roadmapDescription7')}
        </Typography>
        <Typography variant='body2' className={classes.blockDescription}>
          {t('about.qa')}
        </Typography>
        <Typography variant='subtitle1' fontWeight='bold'>
          {t('about.question2')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockAnswer}>
          {t('about.answer2')}
        </Typography>
        <Typography variant='subtitle1' fontWeight='bold'>
          {t('about.question3')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockAnswer}>
          {t('about.answer3')}
        </Typography>
        <Typography variant='subtitle1' fontWeight='bold'>
          {t('about.question4')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockAnswer}>
          {t('about.answer4')}
        </Typography>
        <Typography variant='subtitle1' fontWeight='bold'>
          {t('about.question5')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockAnswer}>
          {t('about.answer5')}
        </Typography>
        <Typography variant='subtitle1' fontWeight='bold'>
          {t('about.question6')}
        </Typography>
        <Typography variant='subtitle1' className={classes.blockAnswer}>
          {t('about.answer6')}
        </Typography>
        <Typography variant='subtitle2' fontWeight='bold'>
          {`${t('about.joinDiscussion')} `}
          <Link
            href='https://www.t.me/edensmartproxy'
            fontWeight='normal'
            target='_blank'
            rel='noreferrer'
          >
            https://www.t.me/edensmartproxy
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
