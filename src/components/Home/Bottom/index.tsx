import TweetEmbed from 'react-tweet-embed'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import useStyles from './styles'

const Bottom: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.containerBottom}>
      <div className={clsx(classes.wrapperGrid, classes.twitter)}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <TweetEmbed
              tweetId='1606301335141220352'
              placeholder={'loading'}
              options={{
                cards: 'hidden',
                conversation: 'none',
                lang: `${router?.locale !== 'cn' ? router?.locale : 'zh-cn'}`
              }}
            />
          </div>
          <div className={classes.gridItem}>
            <TweetEmbed
              tweetId='1606318293270372352'
              options={{
                cards: 'hidden',
                conversation: 'none',
                lang: `${router?.locale !== 'cn' ? router?.locale : 'zh-cn'}`
              }}
            />
          </div>
          <div className={classes.gridItem}>
            <TweetEmbed
              tweetId='1606091927300046850'
              options={{
                cards: 'hidden',
                conversation: 'none',
                lang: `${router?.locale !== 'cn' ? router?.locale : 'zh-cn'}`
              }}
            />
          </div>
          <div className={classes.gridItem}>
            <TweetEmbed
              tweetId='1578776363435032577'
              options={{
                cards: 'hidden',
                conversation: 'none',
                lang: `${router?.locale !== 'cn' ? router?.locale : 'zh-cn'}`
              }}
            />
          </div>
          <div className={classes.gridItem} id='cardBox1'>
            <TweetEmbed
              tweetId='1516036449698664452'
              options={{
                cards: 'hidden',
                conversation: 'none',
                lang: `${router?.locale !== 'cn' ? router?.locale : 'zh-cn'}`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bottom
