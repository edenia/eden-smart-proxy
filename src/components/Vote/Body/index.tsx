/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockProducerItem } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { socialMediaInfo } from 'config/constants'

import useStyles from './styles'

type voteBodyProps = {
  setBps(delegate: any): void
  bps: { sort: string; data: Array<any> }
}

const Body: React.FC<voteBodyProps> = ({ setBps, bps }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [seletedAllBps, setSelectedAllBps] = useState<boolean>(false)

  const handleSelected = pressBp => {
    const updatedBpState = bps?.data?.map(bp => {
      if (bp.producer === pressBp) return { ...bp, selected: !bp?.selected }

      return bp
    })

    setBps({ ...bps, data: updatedBpState })
  }

  const selectedAll = () => {
    setBps({
      ...bps,
      data: bps?.data?.map(bp => {
        return { ...bp, selected: seletedAllBps ? false : true }
      })
    })
    setSelectedAllBps(!seletedAllBps)
  }

  return (
    <div className={classes.container}>
      <div className={classes.paddingSelectedAll}>
        <label>
          <input
            checked={seletedAllBps}
            className={classes.delegateBpItemCheckbox}
            type='checkbox'
            id='checkbox'
            name='checkbox'
            onChange={() => selectedAll()}
          />
          {t('vote.selectAll')}
        </label>
      </div>
      {bps?.data?.map(bp => (
        <BlockProducerItem
          key={bp?.producer}
          onClick={() => handleSelected(bp?.producer)}
          isSelected={bp?.selected}
          avatarIcon={bp?.voted && '/icons/good-icon.png'}
          name={bp?.producer}
          image={
            bp?.bpJsonData?.org?.branding?.logo_256 || '/logos/no-logo.png'
          }
          bgColor='#fff'
          proxyScore={String(bp.stats)}
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
                        href={`${socialMediaInfo?.links[item[0]]}${item[1]}`}
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
