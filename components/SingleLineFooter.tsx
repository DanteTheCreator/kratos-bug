import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
  
export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

type FooterProps = {
    extraStyles: string;
}

export const WithFooter = (extraStyles: string) => {
    return function (page: ReactElement) {
        return (
          <>
            {page}
            <Footer extraStyles={extraStyles} />
          </>
        )
    }
}

const Footer = ({ extraStyles }: FooterProps) => {
    return (
        <footer className="footer mt-auto py-3">
            <div className="container">
                <div className="row">
                    <div className={`col-lg-7 col-xl-6 col-xxl-5 fs-13 ${extraStyles}`}>
                        <Link href="https://arcton.com/">&copy; Arcton</Link>
                        <span className='px-2'>&middot;</span>
                        <Link href="https://arcton.com/about-us">Contact</Link>
                        <span className='px-2'>&middot;</span>
                        <Link href="https://arcton.com/terms">Privacy &amp; terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

