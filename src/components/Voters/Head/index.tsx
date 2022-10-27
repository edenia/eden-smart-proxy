import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback
} from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import SearchBar from 'components/SearchBar'
import { genesisEdenUtil } from 'utils'

import useStyles from './styles'

type HeadVotersType = {
  setSearchInput: Dispatch<SetStateAction<string>>
}

const Head: React.FC<HeadVotersType> = ({ setSearchInput }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [lastElectionDate, setLastElectionDate] = useState<string>('')

  const getLastElectionDate = useCallback(async () => {
    const test = await genesisEdenUtil.getLastElectionDate()

    setLastElectionDate(test)
  }, [])

  useEffect(() => {
    getLastElectionDate()
  }, [getLastElectionDate])

  return (
    <div className={classes.container}>
      <div className='titleWrapper'>
        <Typography variant='body1'>{t('voters.headTitle')}</Typography>
        <Typography variant='body1'>
          {`${t('voters.lastElection')} ${new Date(
            lastElectionDate
          )?.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}.`}
        </Typography>
      </div>
      <div className={classes.search}>
        <SearchBar setSearchInput={setSearchInput} />
      </div>
    </div>
  )
}

export default Head
