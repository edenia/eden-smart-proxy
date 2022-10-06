import { Card, PreviewProfile } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import Image from 'next/image'

import verifiedIcon from '/public/icons/verified-icon.png'
import twitterIcon from '/public/icons/twitter-icon.png'

import useStyles from './styles'

const twitts = [
  {
    name: 'Angelo Castro',
    photo: '',
    user: '@twtrHandle'
  },
  {
    name: 'Xavier Fernandez',
    photo: '',
    user: '@twtrHandle'
  },
  {
    name: 'Terencio Gomez',
    photo: '',
    user: '@twtrHandle'
  }
]

const Bottom: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.containerBottom}>
      {twitts.map(twitt => (
        <Card
          key={twitt.name}
          width='31%'
          headerContent={
            <div className={classes.headCardContainer}>
              <div className={classes.flex}>
                <PreviewProfile
                  name={twitt.name}
                  image={twitt?.photo}
                  bgColor='#E5E5E5'
                  nameSize='20px'
                  nameColor='#000000'
                  nameFontWeight={600}
                  selectableItems={twitt.user}
                />
                <div className={classes.paddingVerifyIcon}>
                  <Image src={verifiedIcon} />
                </div>
              </div>
              <div className={classes.centerElements}>
                <Image src={twitterIcon} />
              </div>
            </div>
          }
          bobyContent={
            <Typography variant='body1'>
              Duis id arcu fringilla, vulputate nulla eget, lobortis nisi. Cras
              quis feugiat lectus. Donec vestibulum et dolor a vestibulum. In
              interdum, ex nec porttitor consequat, nulla tell #eosproxy
            </Typography>
          }
          footerContent={
            <div className={classes.footerCardContainer}>
              <Typography variant='subtitle1'>
                12:15 PM · May 19, 2009 ·{' '}
              </Typography>
              <Link
                href='google.com'
                rel='noreferrer'
                underline='none'
                className={classes.linkColor}
              >
                <Typography variant='subtitle1'> Twitter for iPhone</Typography>
              </Link>
            </div>
          }
        />
      ))}
    </div>
  )
}

export default Bottom
