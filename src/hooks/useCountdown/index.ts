import { useEffect, useState } from 'react'

const getReturnValues = countDown => {
  if (countDown < 0) return [0, 0, 0, 0]

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  return [days, hours, minutes, seconds]
}

const useCountdown = (targetDate: number): Array<number> => {
  const countDownDate = new Date(targetDate).getTime()
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  )

  useEffect(() => {
    if (countDownDate - new Date().getTime() < 0) {
      setCountDown(countDownDate - new Date().getTime())

      return
    }

    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

export default useCountdown
