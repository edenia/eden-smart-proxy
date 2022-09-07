import { analyticsConfig } from 'config'

const pageview = (url: string): void => {
  window.gtag('config', analyticsConfig.trackingCode, {
    page_path: url
  })
}

const event = (
  eventName: string,
  eventParams?:
    | Gtag.ControlParams
    | Gtag.EventParams
    | Gtag.CustomParams
    | undefined
): void => {
  window.gtag('event', eventName, eventParams)
}

export default {
  pageview,
  event
}
