import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/signin.module.css";
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../public/assets/img/arcton-logo.svg";
import { getLoginFlow } from "../api/axiosConfig";
import { Id } from "../api/axiosConfig";

import { V0alpha2Api, Configuration, Session, Identity, SubmitSelfServiceLoginFlowBody } from "@ory/client"

const basePath = process.env.REACT_APP_ORY_URL || "http://localhost:4433"
const ory = new V0alpha2Api(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  }),
)

const Signin = () => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [flowId, setFlowId] = useState<string>();
  const [action, setAction] = useState<string>();

  useEffect(() => {
    ory.initializeSelfServiceLoginFlowForBrowsers(false).then(
      response => {      
        setCsrfToken((response.data.ui.nodes.find(x => (x.attributes as any).name == 'csrf_token')?.attributes as any).value);
        setFlowId(response.data.id);
        setAction(response.data.ui.action);
      }
    );
  }, []);

  const handleLogin = event => {
    event.preventDefault();
    
    let body: SubmitSelfServiceLoginFlowBody = {
      method: "password",
      identifier: event.target.email.value,
      password: event.target.password.value,
      csrf_token: event.target.csrf_token.value
    }

    ory.submitSelfServiceLoginFlow(flowId!.toString(), body).then(
      response => {
        console.log(response);
      }
    )    
  }

  return (
    <div>
      <div className="container row">
        <div
          className="col-10 ps-0 offset-3"
          style={{
            width: "250px",
            height: "50px",
            position: "relative",
            top: "60px",
          }}
        >
          <Image
            className={`${styles.company_logo}`}
            src={companyLogo}
            alt="image"
            layout="fill"
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className="container p-5 d-flex flex-column">
          <h2 className="mb-5">
            <b>Sign in to you account</b>
          </h2>
          <form
            action={action}
            id="signin"
            method="post"
            onSubmit={handleLogin}
          >
            <input
                value={csrfToken}
                id="csrf_token"
                type="hidden"
              />
            <div className="form-floating mb-2">
              <input
                ref={emailRef}
                id="email"
                type="text"
                className="form-control"
                placeholder="Enter your email address"
              />
              <label htmlFor="email"> Email </label>
            </div>
            <div className="d-flex justify-content-end ">
              <Link className={styles.a} href="/authentication/Recovery">
                Forgot your password?
              </Link>
            </div>
            <div className="form-floating mt-2 mb-4">
              <input
                ref={passwordRef}
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
                <label
                  className={styles.checkbox_label}
                  htmlFor="flexCheckDefault"
                >
                  {" "}
                  Stay signed in for a week{" "}
                </label>
              </div>

              <input className={`${styles.button} btn btn-red`} type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>

      <div className={styles.text__container}>
        <div className="d-flex">
          <p className={styles.signin__text}>Don&#39;t have an account?</p>
          <a className={styles.sign_up} href="*">
            Sign-up
          </a>
        </div>
      </div>

      <div
        className={`${styles.contact_info} d-flex col-3 offset-1 mt-9 justify-content-between`}
      >
        <p>(c) arcton</p>
        <a href="arcton.com">
          <p>Contact</p>
        </a>
        <a href="arcton.com">
          <p>Privacy &amp; Terms</p>
        </a>
      </div>
    </div>
  );
};

export default Signin;
