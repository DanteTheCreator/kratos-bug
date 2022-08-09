import React from "react";
import styles from "../../styles/signin.module.css";
import Image from "next/image";
import Link from "next/link";
import companyLogo from '../../public/assets/img/arcton-logo.svg';
const Signin = () => {
  return (
    <div>
       <div className="container row">
          <div className="col-10 ps-0 offset-3" style={{width: '250px', height: '50px', position: 'relative', top:'60px'}}>
          <Image className={`${styles.company_logo}`}src={companyLogo} alt="image" layout="fill"/>
          </div>
      </div>
      <div className={styles.container}>
        <div className="container p-5 d-flex flex-column">
          <h2 className="mb-5">
            <b>Sign in to you account</b>
          </h2>
          <div className="form-floating mb-2">
            <input
              id="email"
              type="text"
              className="form-control"
              placeholder="Enter your email address"
            />
            <label htmlFor="email"> Email </label>
          </div>
          <div className="d-flex justify-content-end ">
          <Link className={styles.a}href="/authentication/Recovery"> Forgot your password? </Link>
          </div>
          
          <div className="form-floating mt-2 mb-4">
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
              <label className={styles.checkbox_label} htmlFor="flexCheckDefault">
                {" "}
                Stay signed in for a week{" "}
              </label>
            </div>
            <a
              href="#"
              className={`${styles.button} btn btn-red`}
            >
              Continue
            </a>
          </div>
        </div>
      </div>
      <div className={styles.text__container}>
        <div className="d-flex"> 
          <p className={styles.signin__text}>Don't have an account?</p>
          <a className={styles.sign_up}href="*">Sign-up</a>
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

export default Signin;
