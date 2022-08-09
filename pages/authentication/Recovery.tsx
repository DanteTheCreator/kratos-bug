import React from "react";
import styles from "../../styles/recovery.module.css"
import Link from "next/link";
import { NextPage } from "next";

const Recovery: NextPage = () => {
  return (
    <div>
      {" "}
      <div className={styles.container}>
        <div className="container">
          <h4>
            <b>Reset Your Password</b>
          </h4>
          <div className="form-floating mb-4">
            <input
              id="email"
              type="text"
              className="form-control"
              placeholder="Enter your email address"
            />
            <label htmlFor="email"> Email </label>
          </div>
              {/* <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {"   "}
                Stay signed in for a week{" "}
              </label> */}
              
            </div>
            <a
              href="#"
              className={`${styles.button} btn btn-orange rounded-pill`}
            >
              Reset Password
            </a>
            <Link className={styles.a} href="/authentication/Signin">

                Return to Sign-In
              </Link>
          </div>
        </div>
  );
};

export default Recovery;
