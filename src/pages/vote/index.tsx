import type { NextPage, GetStaticProps } from 'next'
import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { AlertColor, Typography } from '@mui/material'
import { Fab, Button, Spinner } from '@edenia/ui-kit'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import { routeUtils, smartProxyUtil, bpsUtil, generateApiUrls } from 'utils'
import { useSharedState } from 'context/state.context'
import i18nUtils from 'utils/i18n'
import { bpsInfo } from 'config/constants'
import likeIcon from '/public/icons/like-icon.png'
import { VoteHead, VoteBody, BaseSnackbar } from 'components'

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
  const [state] = useSharedState()
  const [bps, setBps] = useState<{ sort: string; data: Array<any> }>({
    sort: '',
    data: []
  })
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
          message: t('vote.mustLogin'),
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
      setBps({ ...bps, data: [] })
      setLoadingData(true)
      setMessage({
        severity: 'success',
        message: t('vote.successfulVote'),
        visible: true
      })
      setTimeout(async () => {
        await loadBps(undefined, 30, true)
      }, 1500)
    } catch (error) {
      setMessage({
        severity: 'error',
        message: t('vote.somethingWrong'),
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

      if (state?.ual?.activeUser?.accountName) {
        votes = await smartProxyUtil.getVotes(
          state?.ual?.activeUser?.accountName,
          state?.ual?.activeUser?.accountName,
          1
        )
      }

      const validBps = allBps?.rows?.filter(
        bp => !invalidBps.includes(bp?.producer)
      )
      const bpsValid = validBps.reduce((reduceList, element) => {
        return [...reduceList, element.producer]
      }, [])
      const bpjsonsInfo = await bpsUtil.getBpJons(bpsValid)
      const eosrateApiUrl = generateApiUrls.getEosRateAPIUrlClient({
        bps: JSON.stringify(bpsValid)
      })
      const eosrateBpsStats = (await (await fetch(eosrateApiUrl)).json()) || []
      const validBpsAllData = validBps.map(async bp => {
        const hasVoted = votes?.rows[0]?.producers?.includes(bp?.producer)
        const { rows = [] } = await smartProxyUtil.getStats(bp?.producer, 1)
        const bpJsonData =
          bpjsonsInfo.length > 0
            ? bpjsonsInfo?.find(bpj => bpj?.owner === bp?.producer)
            : bpsInfo?.bpJson?.find(
                bpj => bpj.producer_account_name === bp?.producer
              )

        return {
          ...bp,
          voted: hasVoted,
          next_key: allBps.next_key,
          stats: (await rows[0]?.weight) || 0,
          bpJsonData: bpJsonData?.bp_json || bpJsonData,
          totalVotes: bpJsonData?.total_votes,
          rank: bpJsonData?.rank,
          selected: true,
          eosrateStats: eosrateBpsStats.find(stat => stat?.bp === bp?.producer)
        }
      })

      let resolvePromise = await Promise?.all(validBpsAllData)

      if (resolvePromise[0].rank)
        resolvePromise = resolvePromise.sort((a, b) =>
          a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
        )

      resetData
        ? setBps({ ...bps, data: resolvePromise })
        : setBps({ ...bps, data: [...bps?.data, ...resolvePromise] })
    }
    setLoadingData(false)
  }

  const search = () => {
    if (typeof searchValue === 'string' && searchValue !== '') {
      if (currentBps.length === 0) setCurrentBps(bps.data)

      const filterMembers = bps?.data?.filter(bp =>
        bp?.producer?.toLowerCase()?.includes(searchValue.toLowerCase())
      )
      setBps({ ...bps, data: filterMembers })

      const membersName = filterMembers.reduce((reduceList, element) => {
        return [...reduceList, element?.producer]
      }, [])

      setBps({
        ...bps,
        data: [
          ...filterMembers,
          ...currentBps.filter(bp => {
            if (!membersName?.includes(bp?.producer)) {
              return bp?.producer
                ?.toLowerCase()
                ?.includes(searchValue.toLowerCase())
            }
          })
        ]
      })
    } else {
      setBps({ ...bps, data: currentBps })
      setCurrentBps([])
    }
  }

  const sort = method => {
    method === 'asc'
      ? setBps({
          sort: method,
          data: bps?.data?.sort((a, b) =>
            a.rank
              ? a.rank > b.rank
                ? 1
                : b.rank > a.rank
                ? -1
                : 0
              : a.producer > b.producer
              ? 1
              : b.producer > a.producer
              ? -1
              : 0
          )
        })
      : setBps({
          sort: method,
          data: bps?.data?.sort((a, b) =>
            a.rank
              ? a.rank < b.rank
                ? 1
                : b.rank < a.rank
                ? -1
                : 0
              : a.producer < b.producer
              ? 1
              : b.producer < a.producer
              ? -1
              : 0
          )
        })
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
    if (searchValue === undefined) return
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  useEffect(() => {
    if (state.validUser && !state?.ual?.activeUser?.accountName) return

    const handleLoader = async () => {
      await loadBps(undefined, 30, true)
    }

    handleLoader()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.ual?.activeUser?.accountName])

  return (
    <>
      <NextSeo title={t('vote.voteMetaTitle')} />
      <VoteHead setSearchInput={setSearchValue} sort={sort} />
      <VoteBody bps={bps} setBps={setBps} />
      {loadingData && (
        <div className={classes.loadMoreContainer}>
          <Spinner />
        </div>
      )}
      {bps?.data[bps?.data?.length - 1]?.next_key !== '' && (
        <div className={classes.loadMoreContainer}>
          <Button
            label={t('loadMore')}
            variant='secondary'
            onClick={() =>
              loadBps(bps?.data?.[bps?.data?.length - 1].next_key, 30, false)
            }
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
      {bps?.data?.filter(bp => bp?.selected)?.length > 0 && (
        <Fab
          extended
          externalStyles={classes.fabPosition}
          onClick={() =>
            handleVote(
              bps?.data
                ?.filter(bp => bp?.selected)
                .reduce((reduceList, bp) => {
                  return [...reduceList, bp.producer]
                }, [])
            )
          }
        >
          <div className={classes.centerFabContent}>
            <Image src={likeIcon} />
            <Typography
              className={classes.labelPadding}
              variant='subtitle1'
            >{`${t('vote.voteSelected')} (${
              bps?.data?.filter(bp => bp?.selected)?.length
            })`}</Typography>
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
