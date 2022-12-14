import { DefaultSeoProps } from 'next-seo'
const title = 'Eden Smart Proxy'
const description =
  'The Eden Smart Proxy is an EOS BP Voting Proxy that aims to maximize the voice of individual EOS holders, leverage peer-vetted accountability, reward whitelisted BPs, and provide low-risk APR for all token stakers.'
const url = 'https://proxy.eden.eoscommunity.org'

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Eden Smart Proxy',
  title,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en',
    url,
    title,
    description,
    site_name: 'Eden Smart Proxy',
    images: [
      {
        url: `${url}/images/preview-image.jpg`,
        alt: title
      }
    ]
  },
  twitter: {
    handle: 'Eden Smart Proxy',
    site: 'Eden Smart Proxy',
    cardType: 'summary_large_image'
  }
}

export default SEO
