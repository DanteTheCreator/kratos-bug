import React from "react";
import styles from "../../styles/signup.module.css";

const Register = () => {
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
              id="fullname"
              type="text"
              className="form-control"
              placeholder="Enter your full name"
            />
            <label htmlFor="fullname"> Full Name </label>
          </div>
          <div className="form-select-wrapper mb-4">
            <select className="form-select" aria-label="Default select example">
              <option selected>Choose Country</option>
              <option value="1">I</option>
              <option value="2">Wish</option>
              <option value="3">All</option>
            </select>
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
                Accept Terms and Conditions{" "}
              </label>
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {" "}
                Sign up to News{" "}
              </label>
              
              
            </div>
            <a className={styles.a} href="/Recovery">
                {" "}
                Forgot your password?{" "}
              </a>
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

export default Register;
