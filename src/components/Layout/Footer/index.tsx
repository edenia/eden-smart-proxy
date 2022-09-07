import React from 'react'
import { Typography, Box, Grid, Link } from '@mui/material'
import {
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material'
import { useTranslation } from 'next-i18next'

import Styles from './styles'

type FooterProps = {
  isDarkTheme: boolean
  toggleThemeType(): void
}

const useStyles = Styles

const firstTags = [
  {
    id: 0,
    label: 'home',
    link: '/',
    target: '_self'
  },
  {
    id: 3,
    label: 'contact',
    link: '/contact',
    target: '_self'
  }
]

const secondTags = [
  {
    id: 1,
    label: 'support',
    link: '/support',
    target: '_blank'
  }
]

type LabelProps = {
  link: string
  label: string
  target: string
  rel?: string
}

const Label: React.FC<LabelProps> = ({ link, label, target }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid item md={12} xs={12}>
      <Link href={link} className={classes.aStyle} target={target}>
        <Typography variant='h4' className={classes.legend}>
          {t(label)}
        </Typography>
      </Link>
    </Grid>
  )
}

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <Box className={classes.root}>
        <Grid justifyContent='center' container>
          <Grid item md={6} xs={12}>
            {firstTags.map(label => {
              return (
                <Label
                  key={label.id}
                  link={label.link}
                  label={label.label}
                  target={label.target}
                />
              )
            })}
          </Grid>
          <Grid item md={6} xs={12}>
            {secondTags.map(label => {
              return (
                <Label
                  key={label.id}
                  link={label.link}
                  label={label.label}
                  target={label.target}
                />
              )
            })}
          </Grid>
          <Grid
            container
            className={classes.socialMediaStyle}
            justifyContent='flex-end'
          >
            <Grid
              className={classes.paddingSocialMedia}
              item
              lg={12}
              md={12}
              xs={12}
            >
              <Link
                href='https://www.linkedin.com/'
                color='inherit'
                target='_blank'
                rel='noreferrer'
              >
                <LinkedInIcon className={classes.socialIcon} />
              </Link>
              <Link
                href='https://youtube.com/'
                color='inherit'
                target='_blank'
                rel='noreferrer'
              >
                <YouTubeIcon className={classes.socialIcon} />
              </Link>
              <Typography variant='body1' className={classes.whiteColor}>
                {t('copyright')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Footer
