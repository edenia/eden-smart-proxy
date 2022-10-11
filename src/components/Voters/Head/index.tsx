import { Dispatch, SetStateAction } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import SearchBar from 'components/SearchBar'

import useStyles from './styles'

type HeadVotersType = {
  setSearchInput: Dispatch<SetStateAction<string | undefined>>
}

const Head: React.FC<HeadVotersType> = ({ setSearchInput }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <div className='titleWrapper'>
        <Typography variant='body1'>{t('voters.headTitle')}</Typography>
        <Typography variant='body1'>
          {`${t('voters.lastElection')} October 8, 2022.`}
        </Typography>
      </div>
      <div className={classes.search}>
        <SearchBar setSearchInput={setSearchInput} />
      </div>
    </div>
  )
}

export default Head
