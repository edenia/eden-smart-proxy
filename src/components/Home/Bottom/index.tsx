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
            <Tweet tweetId='1606318293270372352' />
          </div>
          <div className={classes.gridItem}>
            <Tweet tweetId='1606301335141220352' />
          </div>
          <div className={classes.gridItem} id='cardBox1'>
            <Tweet tweetId='1606324710446243846' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bottom
