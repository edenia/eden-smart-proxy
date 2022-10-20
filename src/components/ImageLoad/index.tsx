/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

import useImageOnLoad from 'hooks/useImageLoading'
import { Spinner } from 'components'

const ImgLoading = ({ img, classes }) => {
  const { imgUrl, css } = useImageOnLoad(img)
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(async () => {
      await setShow(false)
    }, 1000)
  }, [])

  return (
    <>
      {show ? (
        <Spinner size={44} />
      ) : (
        <img
          className={classes}
          alt='img Loaded'
          style={{ ...css }}
          src={imgUrl || ''}
        />
      )}
    </>
  )
}

export default ImgLoading
