import React from "react";
import styles from "../../styles/recovery.module.css"
import Link from "next/link";
const Recovery = () => {
  return (
    <div>
      {" "}
      <div className={styles.container}>
        <div className="container d-flex flex-column align-items-center ms-0 px-0">
          <h4 className="col-8 px-0 ms-0">
            <b>Reset Your Password</b>
            <p className={`${styles.header_text} pt-2 mb-4`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe at veniam autem soluta reiciendis repellat.</p>
          </h4>
          <div className="form-floating mb-4 col-8 px-0">
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
              
            <div className="col-8 ">
              <a
                href="#"
                className={`${styles.button} btn btn-red w-100 py-1`}
              >
                Reset Password
              </a>
            </div>
           
            <Link className={styles.a} href="/authentication/Signin">

                <p className={`${styles.return_text} col-8 d-flex ms-0 justify-content-center px-0`}>Return to Sign-In</p>
              </Link>
          </div>
        </div>
        </div>
  );
};

export default Recovery;
