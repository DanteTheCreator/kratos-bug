import styles from '../styles/headerLayout.module.css';
import Link from 'next/link';
import { NextPageWithLayout, AppPropsWithLayout } from '../typescript/types';
import { ReactElement } from 'react';

type HeaderProps = {
    extraStyles: string;
}

export const WithHeader = (extraStyles: HeaderProps) => {
    
    return (
        <div className="d-flex justify-content-start">
            <div className="d-flex flex-column justify-content-start align-items-start col-sm-8 col-md-12 fs-20 ms-2">
                <div>
                <i className="uil uil-home mx-2"></i>
                <Link href="pages/dashboard/Profile" className={`${styles.anchor} my-4`}><a className="text-muted">profile</a></Link>
                </div>
                <div>
                <i className="uil uil-user mx-2"></i>
                <Link href="" className={`${styles.a} my-4 text-muted`}><a className="text-muted">Profile & Identity</a></Link>
                </div>
                <div>
                <i className="uil uil-wallet mx-2"></i>
                <Link href="" className={`${styles.a} my-4`}><a className="text-muted">Wallet</a></Link>
                </div>
                <div>
                <i className="uil uil-shield-check mx-2"></i>
                <Link href="" className={`${styles.a} my-4`}><a className="text-muted">Security</a></Link>
                </div>
                <div>
                <i className="uil uil-chart-line mx-2"></i>
                <Link href="" className={`${styles.a} my-4`}><a className="text-muted">Transaction</a></Link>
                </div>
            </div>
        </div>
       
    )

}

export default WithHeader