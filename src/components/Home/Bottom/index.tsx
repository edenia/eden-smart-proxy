import { Tweet } from 'react-twitter-widgets'
import clsx from 'clsx'

import useStyles from './styles'

const Bottom: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.containerBottom}>
      <div className={clsx(classes.wrapperGrid, classes.twitter)}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <Tweet tweetId='1578776363435032577' />
          </div>
          <div className={classes.gridItem} id='cardBox1'>
            <Tweet tweetId='1516036449698664452' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bottom
