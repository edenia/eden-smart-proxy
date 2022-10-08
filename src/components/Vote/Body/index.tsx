/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockProducerItem } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { smartProxyUtil } from 'utils'
import logoImage from '/public/logos/eden-proxy-logo.png'
import telegramIcon from '/public/icons/telegram-grey-icon.png'

import useStyles from './styles'

const delegates = [
  {
    textAction: 'Not Voting',
    name: 'Block Producer Name1',
    image: logoImage,
    target: '_blank',
    rankValue: 'N',
    proxyScore: 'N',
    eosrateValue: '9.8',
    headItem: logoImage,
    linkIcon: 'google.com',
    avatarIcon: logoImage,
    positionText: '9,200,750 Votes',
    selectableItems: [
      { label: 'Telegram', link: 'google.com' },
      { label: 'Twitter', link: 'google.com' },
      { label: 'Website', link: 'google.com' },
      { label: 'Email', link: 'google.com' },
      { label: 'Interview', link: 'google.com' }
    ]
  },
  {
    textAction: 'Not Voting',
    name: 'Block Producer Name2',
    image: logoImage,
    target: '_blank',
    rankValue: 'N',
    proxyScore: 'N',
    eosrateValue: '9.8',
    headItem: logoImage,
    linkIcon: 'google.com',
    avatarIcon: logoImage,
    positionText: '9,200,750 Votes',
    selectableItems: [
      { label: 'Telegram', link: 'google.com' },
      { label: 'Twitter', link: 'google.com' },
      { label: 'Website', link: 'google.com' },
      { label: 'Email', link: 'google.com' },
      { label: 'Interview', link: 'google.com' }
    ]
  },
  {
    textAction: 'Not Voting',
    name: 'Block Producer Name3',
    image: logoImage,
    target: '_blank',
    headItem: logoImage,
    rankValue: 'N',
    proxyScore: 'N',
    eosrateValue: '9.8',
    linkIcon: 'google.com',
    avatarIcon: logoImage,
    positionText: '9,200,750 Votes',
    selectableItems: [
      { label: 'Telegram', link: 'google.com' },
      { label: 'Twitter', link: 'google.com' },
      { label: 'Website', link: 'google.com' },
      { label: 'Email', link: 'google.com' },
      { label: 'Interview', link: 'google.com' }
    ]
  },
  {
    textAction: 'Not Voting',
    name: 'Block Producer Name4',
    image: logoImage,
    target: '_blank',
    headItem: logoImage,
    rankValue: 'N',
    proxyScore: 'N',
    eosrateValue: '9.8',
    link: 'google.com',
    linkIcon: 'google.com',
    avatarIcon: logoImage,
    positionText: '9,200,750 Votes',
    selectableItems: [
      { label: 'Telegram', link: 'google.com' },
      { label: 'Twitter', link: 'google.com' },
      { label: 'Website', link: 'google.com' },
      { label: 'Email', link: 'google.com' },
      { label: 'Interview', link: 'google.com' }
    ]
  }
]

type voteBodyProps = {
  setSelectedBps(delegate: any): void
  selectedBps: Array<any>
}

const Body: React.FC<voteBodyProps> = ({ setSelectedBps, selectedBps }) => {
  const classes = useStyles()
  const [bps, setBps] = useState<any>()

  const loadMembers = async () => {
    const allBps = await smartProxyUtil.getWhitelistedBps()
    console.log({ allBps })
    if (allBps) {
      const invalidBps = (await smartProxyUtil.getBlacklistedBps()).reduce(
        (reduceList, element) => {
          return [...reduceList, element.bp]
        },
        []
      )
      console.log({ invalidBps })
      const validBps = allBps?.filter((bp): any => {
        console.log({ bp })
        invalidBps.includes(bp.producer)
      })
      setBps(validBps)
    }
  }
  console.log({ bps })
  useEffect(() => {
    loadMembers()
  }, [])

  const handleSelected = delegate => {
    const selected = selectedBps.find(bp => bp.name === delegate.name)
    !selected ? setSelectedBps([...selectedBps, delegate]) : deselect(delegate)
  }

  const deselect = delegate => {
    const currentSelectedBps = selectedBps.filter(
      bp => bp.name !== delegate.name
    )
    setSelectedBps(currentSelectedBps)
  }

  return (
    <div className={classes.container}>
      {delegates.map(delegate => (
        <BlockProducerItem
          key={delegate.name}
          onClick={() => handleSelected(delegate)}
          text={delegate.textAction}
          link={delegate.link}
          name={delegate.name}
          rankValue={delegate.rankValue}
          proxyScore={delegate.proxyScore}
          eosrateValue={delegate.eosrateValue}
          target={delegate.target}
          headItem={<Image src={telegramIcon} />}
          positionText={delegate.positionText}
          selectableItems={
            <div className={classes.flex}>
              {delegate.selectableItems.map((item, index) => (
                <Typography key={index} variant='subtitle2'>
                  {index !== 0 && '·'}
                  <Link
                    className={classes.linkPadding}
                    rel='noreferrer'
                    href={item.link}
                    target='_blank'
                  >
                    {item.label}
                  </Link>
                </Typography>
              ))}
            </div>
          }
        />
      ))}
    </div>
  )
}

export default Body
