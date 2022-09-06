import styles from '../styles/footerLayout.module.css';
import Link from 'next/link';
import { NextPageWithLayout, AppPropsWithLayout } from '../typescript/types';
import { ReactElement } from 'react';

type HeaderProps = {
    extraStyles: string;
}

export const WithHeader = (extraStyles: HeaderProps) => {
    
    return (
        <footer className="d-flex justify-content-center row">
            <div className="d-flex justify-content-around align-items-center col-sm-8 col-md-5 col-lg-4">
                <Link href="" className={styles.p}>profile</Link>
                <Link href="" className={styles.p}>Wallet</Link>
                <Link href="" className={styles.p}>Security</Link>
                <Link href="" className={styles.p}>Transaction</Link>
            </div>
        </footer>
       
    )

}

export default WithHeader