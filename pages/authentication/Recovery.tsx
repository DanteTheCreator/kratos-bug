import React from "react";
import styles from "../../styles/recovery.module.css"
import Image from "next/image";
import Link from "next/link";
import companyLogo from '../../public/assets/img/logo.png';
const Recovery = () => {
  return (
    <div>
        <div className="container row">
          <div className="col-10 ps-0 offset-3" style={{width: '250px', height: '50px', position: 'relative', top:'60px'}}>
          <Image className={`${styles.company_logo}`}src={companyLogo} alt="image" layout="fill"/>
          </div>
        </div>
        {" "}
      <div className={styles.container}>
        <div className="container d-flex flex-column align-items-center ms-0 px-0 row">
          <div className="col-11">
            <h1 className="col-8 px-0 ms-0">
              <b>Reset Your Password</b>
            </h1>
            <p className={`${styles.header_text} pt-2 mb-4`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe at veniam autem soluta reiciendis repellat.</p>
          </div>
        
          <div className="mb-4 col-11 ms-0 px-0 row justify-content-start ps-2 row">
            <div className={`${styles.icon_frame} col-2 col-sm-1 p-0 d-flex justify-content-center align-items-center`}>
                <i className="uil uil-envelope-alt"></i>
            </div>

            <div className={`form-floating col-9 col-sm-10 p-0`}>
              <input
                id="email"
                type="email"
                className={`${styles.input_field} form-control`}
                placeholder="Enter your email address"
              />
              <label htmlFor="email"> Email </label>
            </div>
          </div>
                
          <div className="mb-4 col-11 ms-0 px-0 row justify-content-start ps-2 row">
            <div className="col-11 px-0 ms-0 ">
                <a
                  href="#"
                  className={`${styles.button} btn btn-red py-1`}
                >
                  Reset Password
                </a>
            </div>
          </div>
          <div className="col-11 row d-flex justify-content-start ms-0 px-0">
            <Link className={styles.a} href="/authentication/Signin">
              <div className={`${styles.return_text} col-11 `}>
              <p>Return to Sign-In</p>
              </div>
            </Link>
          </div>
          
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
