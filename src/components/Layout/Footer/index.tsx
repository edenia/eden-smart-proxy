import { Typography, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Footer } from '@edenia/ui-kit'
import { useTheme } from '@mui/styles'
import Image from 'next/image'

import { constantConfig } from 'config'
import edeniaLogo from '/public/logos/edenia-isotipo-grey.png'

import Styles from './styles'

const useStyles = Styles

type FooterCompType = {
  showWhite: boolean
}

const FooterComp: React.FC<FooterCompType> = ({ showWhite }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.footerRoot}>
      <Footer
        socialMediaItems={
          !showWhite ? constantConfig?.footer?.socialMediaItems : undefined
        }
        buttomContent={
          <div className={classes.footerContainer}>
            <Typography
              variant='caption'
              color={theme.palette.grey[600]}
              display='flex'
            >
              {t('footer.communityOwnedPublic')}&ensp;
              <Link
                target='_blank'
                href='https://edenia.com'
                rel='noreferrer'
                color={theme.palette.grey[600]}
                className={classes.linkStyle}
              >
                {`${t('footer.developedEdenia')}`}
              </Link>{' '}
              &ensp;
            </Typography>
            <div>
              <Image src={edeniaLogo} />
            </div>
          </div>
        }
        itemsFooter={constantConfig?.footer?.footerItems}
        bgColor={!showWhite ? '#343434' : '#FFFFFF'}
        color={!showWhite ? '#FFFFFF' : '#262626'}
      />
    </div>
  )
}

export default FooterComp
