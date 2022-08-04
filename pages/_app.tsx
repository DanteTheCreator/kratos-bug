import '../styles/globals.css'
import '../public/assets/css/plugins.css'
import '../public/assets/css/style.css'
// import '../public/assets/css/style.css.map'


import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
