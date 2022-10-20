import { FaSpinner } from 'react-icons/fa'

import useStyles from './styles'

const Spinner: React.FC<{ size?: number }> = ({ size = 56 }) => {
  const classes = useStyles()

  return <FaSpinner size={size} className={classes.testSyule} />
}

export default Spinner
