import CircularProgress from '@mui/material/CircularProgress'
import type { NextPage, GetStaticProps } from 'next'
import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { AlertColor, Typography } from '@mui/material'
import { BaseSnackbar } from 'components'
import { Fab, Button } from '@edenia/ui-kit'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import { routeUtils, smartProxyUtil } from 'utils'
import { useSharedState } from 'context/state.context'
import i18nUtils from 'utils/i18n'
import { bpsInfo } from 'config/constants'
import linkIcon from '/public/icons/link-icon.png'
import { VoteHead, VoteBody } from 'components'

import useStyles from './styles'

type MessageObject = {
  message: string
  severity: AlertColor
  visible: boolean
}

const Vote: NextPage = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [loadingData, setLoadingData] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const [currentBps, setCurrentBps] = useState<any>([])
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
      if (!state?.ual?.activeUser?.accountName) {
        setMessage({
          severity: 'warning',
          message: 'You must login',
          visible: true
        })
        return
      }

      const voteTrx = smartProxyUtil.buildVoteTransaction({
        voter: state?.ual?.accountName,
        producers: selectedBps.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
      })

      await state?.ual?.activeUser?.signTransaction(voteTrx, {
        blocksBehind: 3,
        expireSeconds: 1200,
        broadcast: true
      })
      setSelectedBps([])
      setBps([])
      setLoadingData(true)
      setMessage({
        severity: 'success',
        message: 'Successful vote',
        visible: true
      })
      setTimeout(async () => {
        await loadBps(undefined, 4, true)
      }, 1500)
    } catch (error) {
      setMessage({
        severity: 'error',
        message: 'Something went wrong, try again',
        visible: true
      })
    }
  }

  const loadBps = async (
    nextKey: string | undefined,
    limit: number,
    resetData?: boolean
  ) => {
    setLoadingData(true)
    const allBps = await smartProxyUtil.getWhitelistedBps(nextKey, limit)

    if (allBps) {
      const invalidBps = (await smartProxyUtil.getBlacklistedBps()).reduce(
        (reduceList, element) => {
          return [...reduceList, element.bp]
        },
        []
      )
      let votes

      if (state?.ual?.accountName) {
        votes = await smartProxyUtil.getVotes(
          state?.ual?.accountName,
          state?.ual?.accountName,
          1
        )
      }

      const validBps = allBps?.rows?.filter(
        bp => !invalidBps.includes(bp?.producer)
      )

      const validBpsAllData = validBps.map(async bp => {
        const hasVoted = votes?.rows[0]?.producers?.includes(bp?.producer)
        const { rows = [] } = await smartProxyUtil.getStats(bp?.producer, 1)

        const bpJsonData = bpsInfo?.bpJson?.find(
          bpj => bpj.producer_account_name === bp?.producer
        )

        return {
          ...bp,
          voted: hasVoted,
          next_key: allBps.next_key,
          stats: (await rows[0]?.weight) || 0,
          bpJsonData: bpJsonData || undefined
        }
      })

      const resolvePromise = await Promise?.all(validBpsAllData)

      resetData ? setBps(resolvePromise) : setBps([...bps, ...resolvePromise])
    }
    setLoadingData(false)
  }

  const search = () => {
    if (typeof searchValue === 'string' && searchValue !== '') {
      if (currentBps.length === 0) setCurrentBps(bps)

      const filterMembers = bps.filter(bp =>
        bp?.producer?.toLowerCase()?.includes(searchValue.toLowerCase())
      )
      setBps(filterMembers)

      const membersName = filterMembers.reduce((reduceList, element) => {
        return [...reduceList, element?.producer]
      }, [])

      setBps([
        ...filterMembers,
        ...currentBps.filter(bp => {
          if (!membersName?.includes(bp?.producer)) {
            return bp?.producer
              ?.toLowerCase()
              ?.includes(searchValue.toLowerCase())
          }
        })
      ])
    } else {
      setBps(currentBps)
      setCurrentBps([])
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

  useEffect(() => {
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <>
      <NextSeo title={t('voteMetaTitle')} />
      <VoteHead setSearchInput={setSearchValue} />
      <VoteBody
        bps={bps}
        state={state}
        loadBps={() => loadBps(undefined, 4)}
        selectedBps={selectedBps}
        setSelectedBps={setSelectedBps}
      />
      {loadingData && (
        <div className={classes.loadMoreContainer}>
          <CircularProgress />
        </div>
      )}
      {bps[bps?.length - 1]?.next_key !== '' && (
        <div className={classes.loadMoreContainer}>
          <Button
            label='Load More'
            variant='secondary'
            onClick={() => loadBps(bps[bps.length - 1].next_key, 4)}
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
