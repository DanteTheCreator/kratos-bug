import React from "react";
import styles from "../../styles/signin.module.css";
import Image from "next/image";
import Link from "next/link";
import companyLogo from '../../public/assets/img/logo.png';
const Signin = () => {
  return (
    <div>
       <div className="container row">
          <div className="col-10 ps-0 offset-3" style={{width: '250px', height: '50px', position: 'relative', top:'60px'}}>
          <Image className={`${styles.company_logo}`}src={companyLogo} alt="image" layout="fill"/>
          </div>
       </div>
      <div className={styles.container}>
        <div className="container p-5 d-flex flex-column align-items-center row ms-0">
          <div className="col-11">
            <h1 className="mb-5">
              <b>Sign in to you account</b>
            </h1>
          </div>
        

          <div className="row mb-2 d-flex justify-content-center col-12">
            <div className={`${styles.icon_frame} col-2 col-sm-1 p-0 d-flex justify-content-center align-items-center`}>
              <i className="uil uil-envelope-alt"></i>
            </div>
            <div className={`form-floating col-9 col-sm-10 p-0`}>
              <input
                id="email"
                type="text"
                className={`${styles.input_field} form-control`}
                placeholder="Enter your email address"
              />
              <label htmlFor="email"> Email </label>
            </div>

          </div>
          <div className="col-11 d-flex justify-content-end ">
           <Link className={styles.a}href="/authentication/Recovery"> Forgot your password? </Link>

          </div>
          
        
            <div className="row mb-2 d-flex justify-content-center col-12 ">
              <div className={`${styles.icon_frame} col-2 col-sm-1 p-0 d-flex justify-content-center align-items-center`}>
                <i className="uil uil-padlock"></i>
              </div>

              <div className="form-floating col-9 col-sm-10 p-0">
                  <input
                  id="password"
                  type="password"
                  className={`${styles.input_field} form-control`}
                  placeholder="Enter your password"
                />
                <label htmlFor="password"> Password </label>
              </div>
            </div>

       
           
           
          
            <div className={`${styles.checkbox} col-11 form-check row`}>
              <div className="col-12">
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
            </div>

            <div className="col-11">
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
