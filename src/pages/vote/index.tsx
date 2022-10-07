import type { NextPage, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import { Fab } from '@edenia/ui-kit'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import Image from 'next/image'

import { routeUtils } from 'utils'
import i18nUtils from 'utils/i18n'
import linkIcon from '/public/icons/link-icon.png'
import { VoteHead, VoteBody } from 'components'

import useStyles from './styles'

const Vote: NextPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [selectedBps, setSelectedBps] = useState([])

  return (
    <>
      <NextSeo title={t('voteMetaTitle')} />
      <VoteHead />
      <VoteBody selectedBps={selectedBps} setSelectedBps={setSelectedBps} />
      {selectedBps.length > 0 && (
        <Fab extended externalStyles={classes.fabPosition}>
          <div className={classes.centerFabContent}>
            <Image src={linkIcon} />
            <Typography
              className={classes.labelPadding}
              variant='subtitle1'
            >{`Vote Selected (${selectedBps.length})`}</Typography>
          </div>
        </Fab>
      )}
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

export default Vote
