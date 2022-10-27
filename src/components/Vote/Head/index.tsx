import { Dispatch, SetStateAction } from 'react'
import { Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@mui/styles'

import SortComponent from 'components/SortComponent'
import SearchBar from 'components/SearchBar'

import useStyles from './styles'

type HeadVotersType = {
  setSearchInput: Dispatch<SetStateAction<string | undefined>>
  sort: Dispatch<SetStateAction<string>>
}

const Head: React.FC<HeadVotersType> = ({ setSearchInput, sort }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.container}>
      <div className='titleWrapper'>
        <Typography variant='body1'>{t('vote.title1')}</Typography>
        <Typography variant='body1'>
          {`${t('vote.title2')} `}
          <Link
            href='https://myvoteeos.com/home'
            target='_blank'
            rel='noreferrer'
            underline='none'
            color={theme.palette.primary.light}
          >
            {t('vote.readMore')}
          </Link>
          .
        </Typography>
      </div>
      <div className={classes.searchSort}>
        <SearchBar setSearchInput={setSearchInput} />
        <div className={classes.paddingLeft}>
          <SortComponent sort={sort} />
        </div>
      </div>
    </div>
  )
}

export default Head
