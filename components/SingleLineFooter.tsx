import styles from "../styles/footerLayout.module.css";
import Link from "next/link";
import { NextPageWithLayout, AppPropsWithLayout } from "../typescript/types";
import { ReactElement } from "react";

type FooterProps = {
  extraStyles: string;
};

export const WithFooter = (extraStyles: FooterProps) => {
  return (
    <footer className="d-flex justify-content-center row">
      <div className="d-flex justify-content-around align-items-center col-sm-8 col-md-4">
        <Link href="" className={styles.p}>
          &copy; Arcton
        </Link>
        <p className={styles.dot}>.</p>
        <Link href="" className={styles.p}>
          Contact
        </Link>
        <p className={styles.dot}>.</p>

        <Link href="" className={styles.p}>
          Privacy & terms
        </Link>
      </div>
    </footer>
  );
};

export default WithFooter;
