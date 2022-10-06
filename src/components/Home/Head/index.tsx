import Image from 'next/image'

import LanguageSelector from 'components/LanguageSelector'
import logoImage from '/public/logos/eden-proxy-logo.png'

import useStyles from './styles'

const Head: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <Image src={logoImage} />
      </div>
      <LanguageSelector />
    </div>
  )
}

export default Head
