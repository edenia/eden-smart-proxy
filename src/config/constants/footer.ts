import twitterIcon from '/public/icons/twitter-white-icon.png'
import redditIcon from '/public/icons/reddit-icon.png'
import gitHubIcon from '/public/icons/github-icon.png'
// import telegramIcon from '/public/icons/telegram-icon.png'
const telegramIcon = '/public/icons/telegram-icon.png'

const socialMediaItems = [
  {
    name: 'Twitter',
    ref: 'google.com',
    image: twitterIcon
  },
  {
    name: 'Reddit',
    ref: 'google.com',
    image: redditIcon
  },
  {
    name: 'GitHub',
    ref: 'google.com',
    image: gitHubIcon
  },
  {
    name: 'Telegram',
    ref: 'google.com',
    image: telegramIcon
  }
]

const footerItems = [
  {
    title: 'Eden',
    links: [
      {
        underline: 'none',
        ref: 'google.com',
        target: '_blank',
        text: 'The Community'
      },
      {
        underline: 'none',
        ref: 'google.com',
        target: '_blank',
        text: 'Membership Dashboard'
      },
      {
        underline: 'none',
        ref: 'google.com',
        target: '_blank',
        text: 'Eden NFTs'
      }
    ]
  },
  {
    title: 'RESOURCES',
    links: [
      {
        underline: 'none',
        ref: 'google.com',
        target: '_blank',
        text: 'Eden Peace Treaty'
      },
      {
        underline: 'none',
        ref: 'google.com',
        target: '_blank',
        text: 'Eden on EOS'
      },
      {
        underline: 'none',
        ref: 'google.com',
        target: '_blank',
        text: 'Eden Public Wiki'
      },
      {
        underline: 'none',
        ref: 'google.com',
        target: '_blank',
        text: 'EdenOS Roadmap'
      },
      {
        underline: 'none',
        ref: 'google.com',
        target: '_blank',
        text: 'EdenOS Github Repo'
      }
    ]
  }
]

export default { socialMediaItems, footerItems }
