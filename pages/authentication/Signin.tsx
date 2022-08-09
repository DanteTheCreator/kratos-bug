import React from "react";
import styles from "../../styles/signin.module.css";
import Link from "next/link";
import { NextPage } from "next";

const Signin:NextPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className="container">
          <h4>
            <b>Sign In</b>
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
          
          <div className="form-floating mb-4">
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
            <label htmlFor="password"> Password </label>
            <div className={`${styles.checkbox} form-check`}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {" "}
                Stay signed in for a week{" "}
              </label>
              <Link className={styles.a}href="/authentication/Recovery"> Forgot your password? </Link>
            </div>
            <a
              href="#"
              className={`${styles.button} btn btn-orange rounded-pill`}
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
