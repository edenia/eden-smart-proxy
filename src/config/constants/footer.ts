const socialMediaItems = [
  {
    name: 'Twitter',
    ref: 'https://twitter.com/edensmartproxy',
    image: '/icons/twitter-white-icon.png'
  },
  {
    name: 'GitHub',
    ref: 'https://github.com/edenia/eden-smart-proxy',
    image: '/icons/github-icon.png'
  },
  {
    name: 'Telegram',
    ref: 'https://t.me/edensmartproxy',
    image: '/icons/telegram-icon.png'
  }
]

const footerItems = [
  {
    title: 'EDEN',
    links: [
      {
        underline: 'none',
        ref: 'https://genesis.eden.eoscommunity.org/members',
        target: '_blank',
        text: 'The Community'
      },
      {
        underline: 'none',
        ref: 'https://genesis.eden.eoscommunity.org/induction',
        target: '_blank',
        text: 'Membership Dashboard'
      },
      {
        underline: 'none',
        ref: 'https://www.notion.so/Getting-an-Invite-2d38947d5be94dcb84dfa1ae48894802',
        target: '_blank',
        text: 'Get an Invite'
      }
    ]
  },
  {
    title: 'RESOURCES',
    links: [
      {
        underline: 'none',
        ref: 'https://www.edenelections.com/',
        target: '_blank',
        text: 'Eden Election Process'
      },
      {
        underline: 'none',
        ref: 'https://github.com/edenia/Eden',
        target: '_blank',
        text: 'EdenOS Github Repo'
      }
    ]
  }
]

export default { socialMediaItems, footerItems }
