import styles from '../styles/footerLayout.module.css';
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
  

const Footer = () => {
    
    return (
        <footer className="d-flex justify-content-center row">
            <div className="d-flex justify-content-around align-items-center col-sm-8 col-md-4">
                <Link href="" className={styles.p}> &copy; Arcton</Link>
                <p className={styles.dot}>.</p>
                <Link href="" className={styles.p}>Contact</Link>
                <p className={styles.dot}>.</p>
                <Link href="" className={styles.p}>Privacy & terms</Link>
            </div>
        </footer>
       
    )
}

export default Footer