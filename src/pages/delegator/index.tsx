import { useState, useEffect, useCallback } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Spinner } from '@edenia/ui-kit'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'

import { useSharedState } from 'context/state.context'
import i18nUtils from 'utils/i18n'
import { walletConfig } from 'config'
import { routeUtils } from 'utils'

import useStyles from './styles'
import DelegatorAction from './DelegatorActions'

interface DelegateData {
  claimed: number
  last_claim_time: string
  owner: string
  recipient: string
  staked: number
  unclaimed: number
}

const Delegator: NextPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [state] = useSharedState()
  const [validatingData, setValidatingData] = useState({
    loading: true,
    isUserValid: false
  })

  const [dalegateData, setDelegateData] = useState<DelegateData>({
    claimed: 0,
    last_claim_time: '',
    owner: '',
    recipient: '',
    staked: 0,
    unclaimed: 0
  })

  const getVoterData = useCallback(async () => {
    const { rows = [] } = await state?.ual?.activeUser?.rpc.get_table_rows({
      code: walletConfig.rewardAccount,
      scope: walletConfig.rewardAccount,
      table: 'voter',
      lower_bound: state.ual.accountName,
      uppper_bound: state.ual.accountName,
      json: true,
      limit: 1
    })

    console.log({ rows }) // TODO: this console if just for test

    if (rows[0]) {
      setValidatingData({
        loading: false,
        isUserValid: false
      })
      setDelegateData({
        claimed: 0,
        last_claim_time: '',
        owner: state.ual.accountName,
        recipient: state.ual.accountName,
        staked: 0,
        unclaimed: 0
      })
    }

    setDelegateData(
      rows[0]
        ? rows[0][1]
        : {
            claimed: 0,
            last_claim_time: '',
            owner: state.ual.accountName,
            recipient: state.ual.accountName,
            staked: 0,
            unclaimed: 0
          }
    )
    setValidatingData({
      loading: false,
      isUserValid: true
    })
  }, [state?.ual?.activeUser?.rpc, state.ual.accountName])

  useEffect(() => {
    if (
      !state?.ual?.activeUser ||
      (validatingData.isUserValid && !validatingData.loading)
    )
      return

    getVoterData()
  }, [
    state?.ual?.activeUser,
    validatingData.isUserValid,
    validatingData.loading,
    getVoterData
  ])

  console.log({ validatingData })

  return (
    <>
      <NextSeo title={t('delegator.delegatorMetaTitle')} />
      <div className={classes.topInfo}>
        <div className={classes.columnBlock}>
          <span className={classes.title}>{t('delegator.delegateVote')}</span>
          <span className={classes.title}> {t('delegator.reviewClaim')}</span>
        </div>
        <div className={clsx(classes.columnBlock, classes.currentReward)}>
          <span className={clsx(classes.title, classes.rightTitle)}>
            {`${t('delegator.currentApy')}: 7%`}
          </span>
          <span className={clsx(classes.title, classes.rightTitle)}>
            {`${t('delegator.yourRewards')}: ${dalegateData?.claimed || 'N/A'}`}
          </span>
        </div>
      </div>
      {validatingData.loading ? (
        <Spinner size={44} />
      ) : (
        <DelegatorAction
          isValidUser={validatingData.isUserValid}
          dalegateData={dalegateData}
          getVoterData={getVoterData}
        />
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

export default Delegator
