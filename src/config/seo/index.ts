import { DefaultSeoProps } from 'next-seo'
const title = 'Edenia website'
const description = 'Edenia website.'
const url = 'https://edenia.com'

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Edenia',
  title,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en',
    url,
    title,
    description,
    site_name: 'Edenia',
    images: [
      {
        url: `${url}/images/preview-image.png`,
        alt: title
      }
    ]
  },
  twitter: {
    handle: 'Edenia',
    site: 'Edenia',
    cardType: 'summary_large_image'
  }
}

export default SEO
