/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockProducerItem } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import { useEffect } from 'react'

import { socialMediaInfo } from 'config/constants'

import useStyles from './styles'

type voteBodyProps = {
  setSelectedBps(delegate: any): void
  selectedBps: Array<any>
  state: any
  loadBps(): void
  bps: Array<any>
}

const Body: React.FC<voteBodyProps> = ({
  setSelectedBps,
  selectedBps,
  loadBps,
  state,
  bps
}) => {
  const classes = useStyles()

  useEffect(() => {
    if (!state?.ual?.accountName) return

    loadBps()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!state?.ual?.accountName])

  const handleSelected = pressBp => {
    const selected = selectedBps.find(bp => bp === pressBp)
    !selected ? setSelectedBps([...selectedBps, pressBp]) : deselect(pressBp)
  }

  const deselect = pressBp => {
    const currentSelectedBps = selectedBps.filter(bp => bp !== pressBp)
    setSelectedBps(currentSelectedBps)
  }

  return (
    <div className={classes.container}>
      {bps?.map(bp => (
        <BlockProducerItem
          key={bp.producer}
          onClick={() => handleSelected(bp.producer)}
          isSelected={selectedBps.includes(bp.producer)}
          avatarIcon={bp.voted && '/icons/good-icon.png'}
          name={bp.producer}
          // rankValue='N'
          image={bp?.bpJsonData?.org?.branding?.logo_256}
          proxyScore={String(bp.stats)}
          // eosrateValue='N'
          // positionText='9,200,750 Votes'
          selectableItems={
            <div className={classes.socialItems}>
              {bp?.bpJsonData &&
                Object.entries(bp?.bpJsonData?.org?.social).map(
                  (item, index) => (
                    <Typography key={index} variant='subtitle2'>
                      {index !== 0 && '·'}
                      <Link
                        className={classes.linkPadding}
                        rel='noreferrer'
                        href={`${socialMediaInfo.links[item[0]]}${item[1]}`}
                        target='_blank'
                      >
                        {item[0]}
                      </Link>
                    </Typography>
                  )
                )}
            </div>
          }
        />
      ))}
    </div>
  )
}

export default Body
