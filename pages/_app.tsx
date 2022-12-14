import '../styles/globals.css'
import '../public/assets/css/plugins.css'
import '../public/assets/css/style.css'
import '../public/assets/css/colors/red.css'
import '../public/assets/fonts/dm.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/assets/img/favicon.png" />
      </Head>
      <Component {...pageProps} />
      <Script src="/assets/js/plugins.js" strategy="afterInteractive"></Script>
      <Script src="/assets/js/theme.js" strategy="lazyOnload"></Script>
    </>
  );
}
 
export default MyApp
