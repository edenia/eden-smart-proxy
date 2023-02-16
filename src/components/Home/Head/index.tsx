import LanguageSelector from 'components/LanguageSelector'

import useStyles from './styles'
import LogoSvg from './Logo.svg'

const Head: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <LogoSvg />
      </div>
      <LanguageSelector />
    </div>
  )
}

export default Head
