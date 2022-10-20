import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import { useTranslation } from 'next-i18next'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

import lenguajeIcon from '/public/icons/language-icon.png'

import useStyles from './styles'

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState('')
  const anchorRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const translateSite = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale })
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  useEffect(() => {
    setLanguage(router?.locale || '')
  }, [router.locale])

  return (
    <div>
      <Button
        ref={anchorRef}
        id='composition-button'
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <div className={classes.paddingIcon}>
          <Image src={lenguajeIcon} />
        </div>
        <Typography variant='body1' className={classes.languageLabel}>
          {t(language)}
        </Typography>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={e => {
                      handleClose(e)
                      translateSite('en')
                    }}
                  >
                    {t('en')}
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      handleClose(e)
                      translateSite('es')
                    }}
                  >
                    {t('es')}
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      handleClose(e)
                      translateSite('kr')
                    }}
                  >
                    {t('kr')}
                  </MenuItem>
                  <MenuItem
                    onClick={e => {
                      handleClose(e)
                      translateSite('cn')
                    }}
                  >
                    {t('cn')}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default LanguageSelector
