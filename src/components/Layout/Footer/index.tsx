import React from 'react'
import { Typography, Box, Link } from '@mui/material'
import { Footer } from '@edenia/ui-kit'
import Image from 'next/image'
import { useTheme } from '@mui/styles'

import { constantConfig } from 'config'
import edeniaLogo from '/public/logos/edenia-isotipo-grey.png'

import Styles from './styles'

const useStyles = Styles

const FooterComp: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Box className={classes.root}>
      <Footer
        socialMediaItems={constantConfig?.footer?.socialMediaItems}
        buttomContent={
          <div className={classes.footerContainer}>
            <div className={classes.paddinR}>
              <Image src={edeniaLogo} />
            </div>
            <Typography variant='caption' color={theme.palette.grey[600]}>
              <Link href='https://edenia.com' color={theme.palette.grey[600]}>
                Hosted by Edenia{' '}
              </Link>
              - Community Owned
            </Typography>
          </div>
        }
        itemsFooter={constantConfig?.footer?.footerItems}
        bgColor='#343434'
        color='#FFFFFF'
      />
    </Box>
  )
}

export default FooterComp
