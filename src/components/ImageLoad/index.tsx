/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @next/next/no-img-element */
import React from 'react'

import useImageOnLoad from 'hooks/useImageLoading'

const ImgLoading = ({ img, classes, defaultImg }) => {
  const { imgUrl, css } = useImageOnLoad(img)

  return (
    <img
      className={classes}
      alt='img Loaded'
      style={{ ...css }}
      src={imgUrl || defaultImg}
      onError={event => {
        event.currentTarget.src = defaultImg
      }}
    />
  )
}

export default ImgLoading
