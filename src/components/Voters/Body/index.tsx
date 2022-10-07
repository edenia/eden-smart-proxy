import { DelegateItem } from '@edenia/ui-kit'
import { Link } from '@mui/material'
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
          // image={delegate.image}
          target={delegate.target}
          headItem={<Image src={telegramIcon} />}
          // linkIcon={delegate.linkIcon}
          // avatarIcon={delegate.avatarIcon}
          positionText={delegate.positionText}
          selectableItems={
            <Link href={delegate.selectableItems.ref}>
              <Image src={telegramIcon} alt='Telegram icon' />
              {delegate.selectableItems.user}
            </Link>
          }
        />
      ))}
    </div>
  )
}

export default Body
