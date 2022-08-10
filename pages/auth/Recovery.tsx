import React, { useEffect } from "react";
import styles from "../../styles/recovery.module.css"
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../public/assets/img/logo.png";

const Recovery = () => {
  useEffect(() => {
    
  },[])

  return (
    <div>
      <div className="container row">
          <div className="col-10 ps-0 offset-3" style={{width: '250px', height: '50px', position: 'relative', top:'60px'}}>
          <Image className={`${styles.company_logo}`}src={companyLogo} alt="image" layout="fill"/>
          </div>
      </div>
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
          <div className={`${styles.contact_info} d-flex col-3 offset-1 mt-9 justify-content-between`}>
          <p>(c) arcton</p>
          <a href="arcton.com"><p>Contact</p></a>
          <a href="arcton.com"><p>Privacy & Terms</p></a>
        </div>
      </div>
  );
};

export default Recovery;
