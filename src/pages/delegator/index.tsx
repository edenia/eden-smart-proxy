import { useState, useEffect, useCallback } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Button } from '@edenia/ui-kit'
import { TextField, Switch, FormControlLabel, AlertColor } from '@mui/material'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import { BaseSnackbar } from 'components'
import { useSharedState } from 'context/state.context'
import i18nUtils from 'utils/i18n'
import { walletConfig } from 'config'
import { routeUtils, smartProxyUtil, eosioUtil } from 'utils'

import useStyles from './styles'

const data = [
  {
    name: 'September',
    rewards: 2000
  },
  {
    name: 'October',
    rewards: 7000
  },
  {
    name: 'November',
    rewards: 9800
  },
  {
    name: 'December',
    rewards: 13500
  },
  {
    name: 'Junary',
    rewards: 15000
  }
]

interface DelegateData {
  claimed: number
  last_claim_time: string
  owner: string
  recipient: string
  staked: number
  unclaimed: number
}
type MessageObject = {
  message: string
  severity: AlertColor
  visible: boolean
}

const Delegator: NextPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [state, { setDelegateStateByUser }] = useSharedState()
  const [showSubmit, setShowSubmit] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState<MessageObject>({
    message: '',
    severity: 'success',
    visible: false
  })

  const [dalegateData, setDelegateData] = useState<DelegateData>({
    claimed: 0,
    last_claim_time: '',
    owner: '',
    recipient: '',
    staked: 0,
    unclaimed: 0
  })

  const inputOnChange = e => {
    setRecipient(e.target.value)
  }

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
  }, [state?.ual?.activeUser?.rpc, state.ual.accountName])

  const validateHasDelegateVote = async () => {
    const delegateState = await eosioUtil.getVotingState(
      state?.ual?.activeUser?.accountName
    )

    setDelegateStateByUser(delegateState === eosioUtil.VoteState.ForProxy)
  }

  const delegateVote = async () => {
    try {
      const delegateVoteTrx = smartProxyUtil.buildDelegateTransaction(
        state?.ual?.activeUser?.accountName
      )

      await state?.ual?.activeUser?.signTransaction(delegateVoteTrx, {
        blocksBehind: 3,
        expireSeconds: 1200,
        broadcast: true
      })
      setMessage({
        severity: 'success',
        message: t('routes.delegateVoteMessage'),
        visible: true
      })
      setTimeout(async () => {
        await validateHasDelegateVote()
      }, 1500)
    } catch (error) {
      console.error(error)
      setMessage({
        severity: 'error',
        message: t('routes.somethingWrong'),
        visible: true
      })
    }
  }

  const chanceReceipt = async () => {
    try {
      const entityTrx = {
        account: walletConfig.rewardAccount,
        name: 'changercpt',
        authorization: [
          {
            actor: state.ual.activeUser.accountName,
            permission: 'active'
          }
        ],
        data: {
          owner: state.ual.activeUser.accountName,
          recipient,
          admin: false
        }
      }

      console.log({ entityTrx })

      const { transaction } = await state.ual.activeUser.signTransaction(
        { actions: [entityTrx] },
        {
          broadcast: false,
          blocksBehind: 3,
          expireSeconds: 1200
        }
      )

      setMessage({
        severity: 'success',
        message: t('routes.claimMessage'),
        visible: true
      })

      console.log(transaction)
    } catch (error) {
      console.error(error)
      setMessage({
        severity: 'error',
        message: t('routes.somethingWrong'),
        visible: true
      })
    }
  }

  const onCloseSnackBar: any = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      setMessage({ ...message, visible: false })
    },
    [message]
  )

  const undelegateVote = () => {
    try {
      console.log('undelegate vote')
    } catch (error) {
      console.error(error)
    }
  }

  const claimReward = async () => {
    try {
      const entityTrx = {
        account: walletConfig.rewardAccount,
        name: 'claim',
        authorization: [
          {
            actor: state.ual.activeUser.accountName,
            permission: 'active'
          }
        ],
        data: {
          owner: state.ual.activeUser.accountName
        }
      }

      await state.ual.activeUser.signTransaction(
        { actions: [entityTrx] },
        {
          broadcast: false,
          blocksBehind: 3,
          expireSeconds: 1200
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!state?.ual?.activeUser) return

    getVoterData()
  }, [getVoterData, state])

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
      <div className={classes.legend}>
        <span className={classes.legendInfo}>{t('delegator.legend')}</span>
      </div>
      <div className={classes.actionBox}>
        <div>
          <span className={classes.titleLabel}>
            {t('delegator.delegateStatus')}:
          </span>
          <span className={classes.info}>
            {state?.user?.delegateState
              ? t('delegator.active')
              : t('delegator.noDelegate')}
          </span>
        </div>
        {state?.user?.delegateState ? (
          <Button
            onClick={undelegateVote}
            label={t('delegator.undelegate')}
            variant='primary'
            externalStyles={clsx(classes.btnAction, {
              [classes.outlinedBtnRed]: true
            })}
          />
        ) : (
          <Button
            onClick={delegateVote}
            label={t('delegator.delegate')}
            variant='primary'
            externalStyles={classes.btnAction}
            disabled
          />
        )}
      </div>
      <div className={classes.actionBox}>
        <div>
          <span className={classes.titleLabel}>
            {t('delegator.recipient')}:
          </span>
          <span className={classes.info}>
            {state?.user?.delegateState
              ? dalegateData?.recipient
              : t('delegator.noDelegate')}
          </span>
        </div>
        {showSubmit ? (
          <div className={classes.accountSubmit}>
            <TextField
              id='recipient-basic'
              label={t('account')}
              variant='outlined'
              size='small'
              value={recipient}
              onChange={inputOnChange}
            />
            <Button
              onClick={chanceReceipt}
              label={t('delegator.submit')}
              variant='primary'
              externalStyles={classes.btnAction}
            />
          </div>
        ) : (
          <Button
            onClick={() => setShowSubmit(true)}
            label={t('delegator.sendTo')}
            variant='primary'
            externalStyles={clsx(classes.btnAction, {
              [classes.disabledBtn]: !state?.user?.delegateState,
              [classes.outlinedBtn]: state?.user?.delegateState
            })}
          />
        )}
      </div>
      <div className={clsx(classes.actionBox, classes.lastBlock)}>
        <div>
          <span className={classes.titleLabel}>{t('delegator.rewards')}:</span>
          <span className={classes.info}>
            {state?.user?.delegateState
              ? dalegateData?.unclaimed
              : t('delegator.noDelegate')}
          </span>
        </div>
        <div className={classes.claimBox}>
          <FormControlLabel
            value='start'
            control={
              <Switch color='primary' classes={{ checked: classes.checked }} />
            }
            label='Auto Claim'
            labelPlacement='start'
          />
          <Button
            onClick={claimReward}
            label={t('delegator.claim')}
            variant='primary'
            externalStyles={clsx(classes.btnAction, {
              [classes.disabledBtn]:
                !state?.user?.delegateState || !dalegateData?.unclaimed
            })}
          />
        </div>
      </div>
      <span className={classes.graphTitle}>
        {t('delegator.projectedRewards')}:
      </span>
      <div className={classes.graph}>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' fontSize={14} />
            <YAxis fontSize={14} />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='rewards'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <BaseSnackbar
        snackbarProps={{
          open: message.visible,
          onClose: onCloseSnackBar
        }}
        alertProps={{
          severity: message.severity
        }}
        message={message.message}
      />
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
