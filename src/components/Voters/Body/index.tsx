import { DelegateItem } from '@edenia/ui-kit'
import { Link, Typography } from '@mui/material'
import Image from 'next/image'

import logoImage from '/public/logos/eden-proxy-logo.png'
import telegramIcon from '/public/icons/telegram-grey-icon.png'

import useStyles from './styles'

const delegates = [
  {
    textAction: 'Not Voting',
    name: 'Scarlett Cottsworth',
    image: logoImage,
    target: '_blank',
    headItem: logoImage,
    linkIcon: 'google.com',
    avatarIcon: logoImage,
    positionText: 'Chief Delegate - Rate: n',
    selectableItems: { user: 'sacottsworth', ref: 'google.com' }
  },
  {
    textAction: 'Not Voting',
    name: 'Scarlett Cottsworth',
    image: logoImage,
    target: '_blank',
    headItem: logoImage,
    linkIcon: 'google.com',
    avatarIcon: logoImage,
    positionText: 'Chief Delegate - Rate: n',
    selectableItems: { user: 'sacottsworth', ref: 'google.com' }
  },
  {
    textAction: 'Not Voting',
    name: 'Scarlett Cottsworth',
    image: logoImage,
    target: '_blank',
    headItem: logoImage,
    linkIcon: 'google.com',
    avatarIcon: logoImage,
    positionText: 'Chief Delegate - Rate: n',
    selectableItems: { user: 'sacottsworth', ref: 'google.com' }
  },
  {
    textAction: 'Not Voting',
    name: 'Scarlett Cottsworth',
    image: logoImage,
    target: '_blank',
    headItem: logoImage,
    link: 'google.com',
    linkIcon: 'google.com',
    avatarIcon: logoImage,
    positionText: 'Chief Delegate - Rate: n',
    selectableItems: { user: 'sacottsworth', ref: 'google.com' }
  }
]

const Body: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {delegates.map(delegate => (
        <DelegateItem
          key={delegate.name}
          text={delegate.textAction}
          link={delegate.link}
          name={delegate.name}
          target={delegate.target}
          headItem={<Image src={telegramIcon} />}
          positionText={delegate.positionText}
          selectableItems={
            <div className={classes.centerSelectableItems}>
              <Image src={telegramIcon} alt='Telegram icon' />
              <Typography
                variant='subtitle1'
                className={classes.labelSelectedItems}
              >
                <Link
                  href={delegate.selectableItems.ref}
                  rel='noreferrer'
                  underline='none'
                  target='_blank'
                >
                  {delegate.selectableItems.user}
                </Link>
              </Typography>
            </div>
          }
        />
      ))}
    </div>
  )
}

export default Body
