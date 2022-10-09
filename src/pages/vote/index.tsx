import type { NextPage, GetStaticProps } from 'next'
import { useState, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { AlertColor, Typography } from '@mui/material'
import { BaseSnackbar } from 'components'
import { Fab, Button } from '@edenia/ui-kit'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import { routeUtils, smartProxyUtil } from 'utils'
import { useSharedState } from 'context/state.context'
import i18nUtils from 'utils/i18n'
import linkIcon from '/public/icons/link-icon.png'
import { VoteHead, VoteBody } from 'components'

import useStyles from './styles'

type MessageObject = {
  message: string
  severity: AlertColor
  visible: boolean
}

const Vote: NextPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [selectedBps, setSelectedBps] = useState([])
  const [state] = useSharedState()
  const [bps, setBps] = useState<any>([])
  const [message, setMessage] = useState<MessageObject>({
    message: '',
    severity: 'success',
    visible: false
  })

  const handleVote = async selectedBps => {
    try {
      const voteTrx = smartProxyUtil.buildVoteTransaction({
        voter: state?.ual?.accountName,
        producers: selectedBps.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
      })

      await state?.ual?.activeUser?.signTransaction(voteTrx, {
        blocksBehind: 3,
        expireSeconds: 1200,
        broadcast: true
      })
      setMessage({
        severity: 'success',
        message: 'Successful vote',
        visible: true
      })
      setSelectedBps([])
      loadBps(undefined)
    } catch (error) {
      setMessage({
        severity: 'error',
        message: 'Something went wrong, try again',
        visible: true
      })
    }
  }

  const loadBps = async nextKey => {
    const allBps = await smartProxyUtil.getWhitelistedBps(nextKey, 2)

    if (allBps) {
      const invalidBps = (await smartProxyUtil.getBlacklistedBps()).reduce(
        (reduceList, element) => {
          return [...reduceList, element.bp]
        },
        []
      )
      const votes = await smartProxyUtil.getVotes(state?.ual?.accountName, 1)
      const validBps = allBps?.rows?.reduce((previous, current): any => {
        if (invalidBps.includes(current?.producer)) return previous

        const hasVoted = votes?.rows[0]?.producers?.includes(current?.producer)
        return [
          ...previous,
          { ...current, voted: hasVoted, next_key: allBps.next_key }
        ]
      }, [])

      setBps([...bps, ...validBps])
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

  return (
    <>
      <NextSeo title={t('voteMetaTitle')} />
      <VoteHead />
      <VoteBody
        bps={bps}
        loadBps={() => loadBps(undefined)}
        selectedBps={selectedBps}
        setSelectedBps={setSelectedBps}
      />
      {bps[bps?.length - 1]?.next_key !== '' && (
        <div className={classes.loadMoreContainer}>
          <Button
            label='Load More'
            variant='secondary'
            onClick={() => loadBps(bps[bps.length - 1].next_key)}
          />
        </div>
      )}
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
      {selectedBps.length > 0 && (
        <Fab
          extended
          externalStyles={classes.fabPosition}
          onClick={() => handleVote(selectedBps)}
        >
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
