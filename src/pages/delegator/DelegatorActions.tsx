import React, { useState, useCallback, ReactNode, useEffect } from 'react'
import { Button } from '@edenia/ui-kit'
import { TextField, AlertColor, Button as ButtonMUI } from '@mui/material'
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

import { BaseSnackbar, CountdownTimer } from 'components'
import { useSharedState } from 'context/state.context'
import { walletConfig } from 'config'
import { smartProxyUtil, eosioUtil, formatters } from 'utils'

import useStyles from './styles'

const data = [
  {
    name: 'September',
    rewards: 0
  },
  {
    name: 'October',
    rewards: 0
  },
  {
    name: 'November',
    rewards: 0
  },
  {
    name: 'December',
    rewards: 0
  },
  {
    name: 'Junary',
    rewards: 0
  }
]

interface DelegateData {
  claimed: number
  last_claim_time: string
  owner: string
  recipient: string
  staked: number
  unclaimed: number
  unclaimedEOS: number
  claimedEOS: number
}
interface DelegateBody {
  isValidUser: boolean
  dalegateData: DelegateData
  getVoterData: () => void
  children?: ReactNode
}
type MessageObject = {
  message: string
  severity: AlertColor
  visible: boolean
}

const DelegatorAction: React.FC<DelegateBody> = ({
  isValidUser,
  dalegateData,
  getVoterData
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [state] = useSharedState()
  const [showSubmit, setShowSubmit] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [nextDistribution, setNextDistribution] = useState<number>(0)
  const [userVoteForProxy, setUserVoteForProxy] = useState(false)
  const [message, setMessage] = useState<MessageObject>({
    message: '',
    severity: 'success',
    visible: false
  })

  const inputOnChange = e => {
    setRecipient(e.target.value)
  }

  const validateHasDelegateVote = useCallback(async () => {
    const delegateState = await eosioUtil.getVotingState(
      state?.ual?.activeUser?.accountName
    )

    setUserVoteForProxy(delegateState === eosioUtil.VoteState.ForProxy)
  }, [setUserVoteForProxy, state?.ual?.activeUser?.accountName])

  const getNextDistributionDate = useCallback(async () => {
    const [, distribution] = await eosioUtil.getDistributionData()
    const DATE_FORMATED = new Date(distribution.distribution_time).getTime()

    setNextDistribution(DATE_FORMATED)
  }, [setNextDistribution])

  const delegateVote = async (isUndelegate = false) => {
    try {
      const delegateVoteTrx = smartProxyUtil.buildDelegateTransaction(
        state?.ual?.activeUser?.accountName,
        isUndelegate
      )

      await state?.ual?.activeUser?.signTransaction(delegateVoteTrx, {
        blocksBehind: 3,
        expireSeconds: 120,
        broadcast: true
      })
      setMessage({
        severity: 'success',
        message: isUndelegate
          ? t('delegator.undelegateVoteMessage')
          : t('delegator.delegateVoteMessage'),
        visible: true
      })
      setTimeout(async () => {
        await validateHasDelegateVote()
      }, 1500)
    } catch (error) {
      console.error(error)
      setMessage({
        severity: 'error',
        message: t('delegator.somethingWrong'),
        visible: true
      })
    }
  }

  const chanceReceipt = async () => {
    try {
      const entityTrx = formatters.getActionFormat(
        walletConfig.rewardAccount,
        'changercpt',
        state.ual.activeUser.accountName,
        {
          owner: state.ual.activeUser.accountName,
          recipient,
          admin: false
        }
      )

      await state.ual.activeUser.signTransaction(
        { actions: [entityTrx] },
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 120
        }
      )

      setMessage({
        severity: 'success',
        message: t('delegator.recipientMessage'),
        visible: true
      })

      setShowSubmit(false)
      await getVoterData()
    } catch (error) {
      console.error(error)
      setMessage({
        severity: 'error',
        message: t('delegator.somethingWrong'),
        visible: true
      })
    }
  }

  const onCloseSnackBar: any = useCallback(
    (e?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') return

      setMessage({ ...message, visible: false })
    },
    [message]
  )

  const undelegateVote = () => {
    try {
      delegateVote(true)
    } catch (error) {
      console.error(error)
    }
  }

  const claimReward = async () => {
    try {
      const entityTrx = formatters.getActionFormat(
        walletConfig.rewardAccount,
        'claim',
        state.ual.activeUser.accountName,
        {
          owner: state.ual.activeUser.accountName
        }
      )

      await state.ual.activeUser.signTransaction(
        { actions: [entityTrx] },
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 120
        }
      )
      await getVoterData()
    } catch (error) {
      console.error(error)
    }
  }

  const validateUser = async () => {
    try {
      const entityTrx = formatters.getActionFormat(
        walletConfig.rewardAccount,
        'signup',
        state.ual.activeUser.accountName,
        {
          owner: state.ual.activeUser.accountName,
          recipient: state.ual.activeUser.accountName
        }
      )

      await state.ual.activeUser.signTransaction(
        { actions: [entityTrx] },
        {
          broadcast: true,
          blocksBehind: 3,
          expireSeconds: 120
        }
      )
      await getVoterData()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const validateUserVote = async () => {
      await validateHasDelegateVote()
      await getNextDistributionDate()
    }

    validateUserVote()
  }, [validateHasDelegateVote, getNextDistributionDate])

  if (!isValidUser)
    return (
      <div className={classes.signupBox}>
        <div className={clsx(classes.legend, classes.validatorBox)}>
          <span className={classes.legendInfo}>
            {t('delegator.signupMessage')}
          </span>
        </div>
        <Button
          onClick={validateUser}
          label={t('delegator.validate')}
          variant='primary'
          externalStyles={classes.btnAction}
        />
      </div>
    )

  return (
    <>
      <div className={classes.legend}>
        <span className={classes.legendInfo}>{t('delegator.legend')}</span>
      </div>
      <div className={classes.actionBox}>
        <div>
          <span className={classes.titleLabel}>
            {t('delegator.delegateStatus')}:
          </span>
          <span className={classes.info}>
            {userVoteForProxy
              ? t('delegator.active')
              : t('delegator.noDelegate')}
          </span>
        </div>
        {userVoteForProxy ? (
          <Button
            onClick={undelegateVote}
            label={t('delegator.undelegated')}
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
            {userVoteForProxy
              ? dalegateData?.recipient
              : t('delegator.noDelegate')}
          </span>
        </div>
        {showSubmit ? (
          <div className={classes.accountSubmit}>
            <TextField
              id='recipient-basic'
              label={t('account')}
              placeholder='edenprxfunds'
              variant='outlined'
              size='small'
              value={recipient}
              onChange={inputOnChange}
            />
            <ButtonMUI
              onClick={() => setShowSubmit(false)}
              variant='text'
              sx={{
                marginRight: `16px`,
                color: '#C5283D',
                textTransform: 'capitalize',
                borderColor: '#C5283D',
                '& .MuiSvgIcon-root': {
                  fontSize: 16
                }
              }}
            >
              {t('delegator.close')}
            </ButtonMUI>
            <Button
              onClick={chanceReceipt}
              label={t('delegator.submit')}
              variant='primary'
              externalStyles={classes.btnAction}
            />
          </div>
        ) : (
          <Button
            disabled={!userVoteForProxy}
            onClick={() => setShowSubmit(true)}
            label={t('delegator.sendTo')}
            variant='primary'
            externalStyles={clsx(classes.btnAction, {
              [classes.disabledBtn]: !userVoteForProxy,
              [classes.outlinedBtn]: userVoteForProxy
            })}
          />
        )}
      </div>
      <div className={clsx(classes.actionBox, classes.lastBlock)}>
        <div className={classes.yourRewardsBox}>
          <div className={classes.nextDistribution}>
            <span className={classes.titleLabel}>
              {t('delegator.rewards')}:
            </span>
            <span className={classes.info}>
              {userVoteForProxy
                ? `${dalegateData?.unclaimedEOS} EOS`
                : t('delegator.noDelegate')}
            </span>
          </div>

          <CountdownTimer
            date={nextDistribution}
            style={classes.info}
            distributionLabel={t('delegator.distributionLabel')}
          />
        </div>
        <div className={classes.claimBox}>
          <Button
            disabled={!userVoteForProxy || !dalegateData?.unclaimed}
            onClick={claimReward}
            label={t('delegator.claim')}
            variant='primary'
            externalStyles={clsx(classes.btnAction, {
              [classes.disabledBtn]:
                !userVoteForProxy || !dalegateData?.unclaimed
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

export default DelegatorAction
