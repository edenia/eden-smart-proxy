import { useState } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Button } from '@edenia/ui-kit'
import { TextField, Switch, FormControlLabel } from '@mui/material'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'

import i18nUtils from 'utils/i18n'
import { routeUtils } from 'utils'

import useStyles from './styles'

const Delegator: NextPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [showSubmit, setShowSubmit] = useState(false)

  return (
    <>
      <NextSeo title={t('delegator.delegatorMetaTitle')} />
      <div className={classes.topInfo}>
        <div className={classes.columnBlock}>
          <span className={classes.title}>
            Delegate your vote to start receiving rewards.
          </span>
          <span className={classes.title}>Review and claim your rewards.</span>
        </div>
        <div className={classes.columnBlock}>
          <span className={clsx(classes.title, classes.rightTitle)}>
            Current APY: 7%
          </span>
          <span className={clsx(classes.title, classes.rightTitle)}>
            Your Rewards: N/A
          </span>
        </div>
      </div>
      <div className={classes.actionBox}>
        <div>
          <span className={classes.titleLabel}>
            {t('delegator.delegateStatus')}:
          </span>
          <span className={classes.info}>{t('delegator.noDelegate')}</span>
        </div>
        <Button
          onClick={() => console.log('delegate')}
          label={t('delegator.delegate')}
          variant='primary'
          externalStyles={classes.btnAction}
          disabled
        />
      </div>
      <div className={classes.actionBox}>
        <div>
          <span className={classes.titleLabel}>
            {t('delegator.recipient')}:
          </span>
          <span className={classes.info}>{t('delegator.noDelegate')}</span>
        </div>
        {showSubmit ? (
          <div className={classes.accountSubmit}>
            <TextField
              id='outlined-basic'
              label='account'
              variant='outlined'
              size='small'
            />
            <Button
              onClick={() => console.log('submit')}
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
              [classes.disabledBtn]: false,
              [classes.outlinedBtn]: true
            })}
          />
        )}
      </div>
      <div className={classes.actionBox}>
        <div>
          <span className={classes.titleLabel}>{t('delegator.rewards')}:</span>
          <span className={classes.info}>{t('delegator.noDelegate')}</span>
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
            onClick={() => console.log('claim')}
            label={t('delegator.claim')}
            variant='primary'
            externalStyles={clsx(classes.btnAction, {
              [classes.disabledBtn]: true
            })}
          />
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

export default Delegator
