/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect } from 'react'

import { useSharedState } from 'context/state.context'

const _cachedImage = async (img: string, setImgCallback: any) => {
  const res = await fetch(`https://ipfs.io/ipfs/${img}`)

  const imageBlob = await res.blob()
  const imageObject = URL.createObjectURL(imageBlob)

  setImgCallback({ cid: img, imgUrl: imageObject })

  return imageObject
}

const useImageOnLoad = (img: string) => {
  const [{ imgCached }, { setImg }] = useSharedState()
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [css, setCss] = useState({
    filter: 'blur(5px)',
    backgroundSize: 'cover'
  })

  const fetchImage = async () => {
    const style = {
      ...css,
      filter: 'none',
      transition: 'filter 0ms ease-out 500ms'
    }

    if (!img) {
      setCss(style)
      setImgUrl(null)

      return
    }

    const imageCached = imgCached.find(i => i.cid === img)

    if (!imageCached) {
      const imageObjectURL = await _cachedImage(img, setImg)

      setCss(style)
      setImgUrl(imageObjectURL)
    } else {
      setCss(style)
      setImgUrl(imageCached.imgUrl)
    }
  }

  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img])

  return { css, imgUrl }
}

export default useImageOnLoad
