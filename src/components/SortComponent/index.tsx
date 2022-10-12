/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import { useState } from 'react'
import Image from 'next/image'

import sortIcon from '/public/icons/sort-icon.png'

import useStyles from './styles'

type HeadSortType = {
  sort(value: any): void
}

const SortComponent: React.FC<HeadSortType> = ({ sort }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [labelSorted, setLabelSorted] = useState<string>('vote.sort')
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSorted = method => {
    setLabelSorted(`vote.${method}`)
    sort(method)
  }

  return (
    <div className={classes.container}>
      <div
        className={classes.paddingImage}
        onClick={event => handleClick(event.currentTarget)}
      >
        <Image src={sortIcon} />
      </div>
      <Typography variant='body2' fontWeight='normal'>
        {t(labelSorted)}
      </Typography>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => handleSorted('asc')}>{t('vote.asc')}</MenuItem>
        <MenuItem onClick={() => handleSorted('descending')}>
          {t('vote.descending')}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default SortComponent
