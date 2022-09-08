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
            <nav className="navbar navbar-expand-lg navbar navbar-light">
                <div className="container-fluid">
                    <button className="hamburger offcanvas-nav-btn d-lg-none" data-bs-dismiss="#navbarNav" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle Navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav d-flex flex-column justify-content-center align-items-center align-items-xl-start col-12 fs-18 ms-2">
                            <li className="nav-item">
                                <div className={`${styles.anchor} px-2 nav-link active py-2`} aria-current="page">
                                    <i className="uil uil-home me-2"></i>
                                    <Link href="pages/dashboard/Profile"><a className={`my-4 text-muted`}>Home</a></Link>
                                </div>
                            </li>

                            <li className="nav-item">
                                <div className={`${styles.anchor} px-2 nav-link active py-2`} aria-current="page">
                                    <i className="uil uil-user me-2"></i>
                                    <Link href="pages/dashboard/Profile"><a className={`my-4 text-muted`}>Profile</a></Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={`${styles.anchor} px-2 nav-link active py-2`} aria-current="page">
                                    <i className="uil uil-wallet me-2"></i>
                                    <Link href="pages/dashboard/Profile"><a className={`my-4 text-muted`}>Wallet</a></Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={`${styles.anchor} px-2 nav-link active py-2`} aria-current="page">
                                    <i className="uil uil-shield-check me-2"></i>
                                    <Link href="pages/dashboard/Profile"><a className={`my-4 text-muted`}>Security</a></Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={`${styles.anchor} px-2 nav-link active py-2`} aria-current="page">
                                    <i className="uil uil-chart-line me-2"></i>
                                    <Link href="pages/dashboard/Profile"><a className={`my-4 text-muted`}>Transaction</a></Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>    
    )

}

export default WithHeader