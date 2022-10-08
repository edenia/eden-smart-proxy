/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Box, Menu } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Button } from '@edenia/ui-kit'

import useAuthUAL from './useAuthUAL.hook'
import useStyles from './styles'

const AuthButton: React.FC = () => {
  const [{ state }, { handleOpenMenu, handleCloseMenu, login }] = useAuthUAL()
  const classes = useStyles()

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {!state?.ual?.activeUser && (
          <Button
            onClick={() => handleOpenMenu()}
            label='Sign in and vote'
            variant='primary'
          />
        )}
      </Box>
      <Menu
        className={classes.menuBox}
        anchorEl={state?.elemRef || null}
        id='account-menu'
        open={state?.openMenuWallets}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {(state?.ual?.authenticators || []).map(wallet => {
          const style = wallet.getStyle()
          const name = wallet.getName()

          return (
            <div
              key={style.text}
              className={classes.menuItem}
              style={{
                backgroundColor: style.background,
                color: style.textColor
              }}
              onClick={() => login(name)}
              role='button'
              tabIndex={0}
              aria-hidden='true'
            >
              <div className={classes.iconText}>
                <img
                  src={style.icon}
                  width={28}
                  height={28}
                  alt='wallet indicator'
                />
                {style.text}
              </div>
              <KeyboardArrowRightIcon />
            </div>
          )
        })}
      </Menu>
    </React.Fragment>
  )
}

export default AuthButton
