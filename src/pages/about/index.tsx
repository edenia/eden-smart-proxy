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
      <NextSeo title={t('votersMetaTitle')} />
      <div className={classes.container}>
        <Typography variant='body2'>What is Eden Proxy?</Typography>
        <Typography variant='subtitle1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          maximus molestie laoreet. Vestibulum in varius neque. Praesent at
          finibus nisi. Vestibulum sagittis nec ligula non vulputate. Donec eu
          nulla rutrum, volutpat eros sit amet, tempor augue. Maecenas risus
          quam, efficitur nec enim quis, pretium semper turpis. Duis id arcu
          fringilla, vulputate nulla eget, lobortis nisi. Cras quis feugiat
          lectus. Donec vestibulum et dolor a vestibulum. In interdum, ex nec
          porttitor consequat, nulla tellus malesuada velit, eu pretium augue
          dolor ut nisi. Proin pretium convallis urna, quis dictum nulla ornare
          eu. Nulla et mollis lorem. Nulla pretium lacus tortor, sit amet
          dignissim mi tincidunt non. Suspendisse ut maximus dui. Ut massa mi,
          luctus a magna ut, porta viverra libero.
        </Typography>
        <br />
        <Typography variant='body2'>How does the whitelist work?</Typography>
        <Typography variant='subtitle1'>
          The BP whitelist is sustained by MyvoteEOS, a BPs self-regulatory
          body. To eradicate the subjectivity in the whitelisting process,
          MyvoteEOS qualifies only those BPs who clear below four yes/no
          questions:
        </Typography>
        <Typography variant='subtitle1'>
          1. No engagement in vote compromise in any form. (Operating its own
          proxy with direct APR provision, buying votes from 3rd party exchanges
          or proxies.)
        </Typography>
        <Typography variant='subtitle1'>
          2. Providing public financial and operation reports on a regular
          basis.
        </Typography>
        <Typography variant='subtitle1'>
          3. No more than one BP with the same ownership.
        </Typography>
        <Typography variant='subtitle1'>
          4. Acknowledge that BPs can be unlisted at any time if engage with any
          ativities above.
        </Typography>
        <br />
        <Typography variant='subtitle1'>Disclaimer:</Typography>
        <Typography variant='subtitle1'>
          • As a grace-period, BPs are not going to be requested to drop their
          existing vote-buy until they receive 30m to stay in the pay range.
        </Typography>
        <Typography variant='subtitle1'>
          •
          {` There's is no subjectivity in the whitelist other than above 4
          criterias.`}
        </Typography>
        <Typography variant='subtitle1'>
          • As a grace-period, BPs are not going to be requested to drop their
          existing vote-buy until they receive 30m to stay in the pay range.
        </Typography>
        <br />
        <Typography variant='body2'>Why should I vote?</Typography>
        <Typography variant='subtitle1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          maximus molestie laoreet. Vestibulum in varius neque. Praesent at
          finibus nisi. Vestibulum sagittis nec ligula non vulputate. Donec eu
          nulla rutrum, volutpat eros sit amet, tempor augue. Maecenas risus
          quam, efficitur nec enim quis, pretium semper turpis. Duis id arcu
          fringilla, vulputate nulla eget, lobortis nisi. Cras quis feugiat
          lectus. Donec vestibulum et dolor a vestibulum.
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
