import { useEffect } from 'react'
import { NextComponentType } from 'next'
import dynamic from 'next/dynamic'
import { AppProps, AppContext, AppInitialProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { DefaultSeo } from 'next-seo'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import '@edenia/ui-kit/dist/index.css'

import '../global.css'
import { themeConfig, seoConfig, analyticsConfig, i18nConfig } from 'config'
import { Locale } from 'config/i18n'
import { analyticsUtils } from 'utils'
import { SharedStateProvider } from 'context/state.context'

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false
})

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}: AppProps) => {
  const { locale, events } = useRouter()
  const currentLocale = (locale as Locale) || i18nConfig.defaultLocale

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      analyticsUtils.pageview(url)
    }

    events.on('routeChangeComplete', handleRouteChange)

    return () => {
      events.off('routeChangeComplete', handleRouteChange)
    }
  }, [events])

  return (
    <>
      <SharedStateProvider>
        <DefaultSeo {...seoConfig} />

        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.trackingCode}`}
        />

        <Script
          id='gtag-init'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsConfig.trackingCode}', {
              page_path: window.location.pathname,
            });
          `
          }}
        />

        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
          <meta
            name='theme-color'
            content={themeConfig.lightTheme.palette.primary.main}
          />
        </Head>
        <ThemeProvider theme={themeConfig.lightTheme}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={i18nConfig?.dateFnsLocaleMap?.[currentLocale]}
          >
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LocalizationProvider>
        </ThemeProvider>
      </SharedStateProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
