import React, { ReactElement, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../public/assets/img/logo.png";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IResponse } from "../../typescript/interfaces";
import {SubmitSelfServiceRegistrationFlowWithPasswordMethodBody} from '@ory/client'
import Footer from "../../components/SingleLineFooter";

const Register = () => {
  const router = useRouter();
  const { ory } = useSelector((state: any) => state.auth);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [flowId, setFlowId] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [isBusy, setIsBusy] = useState<Boolean>(false);

  useEffect(() => {
    console.log("initial");
    ory
      .toSession()
      .then(() => {
        router.push("/dashboard");
      })
      .catch(() => {
        ory
          .initializeSelfServiceRegistrationFlowForBrowsers()
          .then((response: IResponse) => {
            console.log(response);
            setCsrfToken(
              (
                response.data.ui.nodes.find(
                  (x) => (x.attributes as any).name == "csrf_token"
                )?.attributes as any
              ).value
            );
            setFlowId(response.data.id);
          });
      });
  }, [ory, router]);

  const handleSignup = (event: any) => {
    event.preventDefault();
    setIsBusy(true);
    let body: SubmitSelfServiceRegistrationFlowWithPasswordMethodBody = {
      method: "password",
      csrf_token: event.target.csrf_token.value,
      password: event.target.signUpPassword.value,
      traits: {
        email: event.target.signUpEmail.value,
      },
    };

    ory
      .submitSelfServiceRegistrationFlow(flowId!.toString(), body)
      .then((response: IResponse) => {
        router.push("/dashboard");
      })
      
      /**
       * !gotta fix the type for reason
       */
      
      .catch((reason: any) => {
        let messages = reason.response.data.ui.nodes
          .map((x: any) => x.messages)
          .flat();

        if (messages.length > 0) {
          setErrorMessage(messages.map((x:any) => x.text).join(" "));
        } else {
          setErrorMessage("");
        }
        setCsrfToken(
          reason.response.data.ui.nodes.find(
            (x: any) => x.attributes.name == "csrf_token"
          )?.attributes.value
        );
        setIsBusy(false);
      });
  };

  return (
    <main>
      <Head>
        <title>Registration | Arcton</title>
      </Head>

      <section className="wrapper bg-light">
        <div className="container py-14 py-md-16">
          <div className="row">
            <div className="col">
              <div className="row gx-0">
                <div className="col-lg-6 pe-10">
                  <div className="mb-6 mt-12">
                    <Image src={companyLogo} alt="Arcton" />
                  </div>
                  <div className="d-flex flex-row">
                    <i className="uil uil-check-circle fs-17"></i>
                    <div className="ms-3">
                      <h5 className="mb-1">Its your turn</h5>
                      <p>
                        Invest in those shaping tomorrow to build a better future.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <i className="uil uil-check-circle fs-17"></i>
                    <div className="ms-3">
                      <h5 className="mb-1">Access to start-ups</h5>
                      <p>
                        Gain access to early stage start-up investments together with the pros before the rest.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card shadow-lg">
                    <div className="p-10 p-md-11 p-lg-13">
                      <h2 className="mb-6 text-start">
                        Create your Arcton account
                      </h2>

                      {ErrorMessage(errorMessage)}

                      <form className="text-start mb-3" onSubmit={handleSignup}>
                        <input
                          value={csrfToken}
                          id="csrf_token"
                          type="hidden"
                        />
                        <div className="form-floating mb-4">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            id="signUpEmail"
                            required
                            tabIndex={1}
                          />
                          <label htmlFor="signUpEmail">Email</label>
                        </div>
                        <div>
                          <input type="checkbox" id=""/>
                          <label htmlFor="s"> </label>
                        </div>
                        <div className="form-check">
                          <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          <Link href="">Accept TOS</Link>
                        </label>
                        </div>
                        <div className="form-floating password-field mb-4">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            id="signUpPassword"
                            required
                            tabIndex={1}
                          />
                          <span className="password-toggle">
                            <i className="uil uil-eye"></i>
                          </span>
                          <label htmlFor="signUpPassword">Password</label>
                        </div>

                        {SubmitButton(isBusy)}
                      </form>

                      <p className="text-start pt-2 fs-13">
                        Already have an account?{" "}
                        <Link className="" href="/auth/login">
                          Log-in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ErrorMessage = (message: string | undefined) => {
  if (!message || message == "") {
    return "";
  }
  return <div className="alert alert-danger">{message}</div>;
};

const SubmitButton = (isBusy: Boolean) => {
  if (!isBusy) {
    return (
      <button
        className="btn btn-primary btn-login w-100 mb-2"
        tabIndex={3}
        type="submit"
      >
        <span>Sign-up</span>
      </button>
    );
  }

  return (
    <button
      className="btn btn-primary btn-login w-100 mb-2"
      tabIndex={3}
      type="submit"
      disabled
    >
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      &nbsp;&nbsp;
      <span>Sign-up</span>
    </button>
  );
};

Register.getLayout = function (page: ReactElement) {
  return (
    <>
    <div>{page}</div>
    <Footer extraStyles="" />
        </>
  )
}

export default Register;
