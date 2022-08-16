import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../public/assets/img/logo.png";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { SubmitSelfServiceLoginFlowBody } from "@ory/client";

const Signin = () => {
  const router = useRouter();
  const { ory } = useSelector((state: any) => state.auth);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [flowId, setFlowId] = useState<string>();
  const [action, setAction] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [isBusy, setIsBusy] = useState<boolean>(false);

  useEffect(() => {
    ory
      .toSession()
      .then(() => {
        router.push("/dashboard");
      })
      .catch(() => {
        ory
          .initializeSelfServiceLoginFlowForBrowsers(false)
          .then((response) => {
            setCsrfToken(
              (
                response.data.ui.nodes.find(
                  (x) => (x.attributes as any).name == "csrf_token"
                )?.attributes as any
              ).value
            );
            setFlowId(response.data.id);
            setAction(response.data.ui.action);
          });
      });
  }, [ory, router]);

  const handleLogin = (event: any) => {
    event.preventDefault();
    setIsBusy(true);
    let body: SubmitSelfServiceLoginFlowBody = {
      method: "password",
      identifier: event.target.loginEmail.value,
      password: event.target.loginPassword.value,
      csrf_token: event.target.csrf_token.value,
    };

    ory
      .submitSelfServiceLoginFlow(flowId!.toString(), body)
      .then((_) => {
        router.push("/dashboard");
      })
      .catch((reason: any) => {
        if (reason.response.data.ui.messages.length > 0) {
          setErrorMessage(reason.response.data.ui.messages[0].text);
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
        <title>Login | Arcton</title>
      </Head>

      <section className="wrapper bg-light">
        <div className="container pb-14 pb-md-16">
          <div className="row">
            <div className="col-lg-7 col-xl-6 col-xxl-5 mx-auto">
              <div className="col-3 my-10 ps-3">
                <Image src={companyLogo} alt="Arcton" />
              </div>

              <div className="card">
                <div className="card-body p-11">
                  <h2 className="mb-6 text-start">Sign in to your account</h2>

                  {ErrorMessage(errorMessage)}

                  <form
                    action={action}
                    method="post"
                    className="text-start mb-3"
                    onSubmit={handleLogin}
                  >
                    <input value={csrfToken} id="csrf_token" type="hidden" />
                    <div className="form-floating mb-3">
                      <input
                        ref={emailRef}
                        id="loginEmail"
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        required
                        tabIndex={1}
                      />
                      <label htmlFor="loginEmail">Email</label>
                    </div>
                    <div className="text-end pb-1 fs-13">
                      <Link className="" href="/auth/recovery">
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="form-floating password-field mb-6">
                      <input
                        ref={passwordRef}
                        id="loginPassword"
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        required
                        tabIndex={2}
                      />
                      <span className="password-toggle">
                        <i className="uil uil-eye"></i>
                      </span>
                      <label htmlFor="loginPassword">Password</label>
                    </div>

                    {SubmitButton(isBusy)}
                  </form>
                </div>
              </div>

              <p className="text-start pt-4 fs-13 ps-3">
                Don&#39;t have an account?{" "}
                <Link className="" href="/onboarding/index.tsx">
                  Sign up
                </Link>
              </p>
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
        <span>Continue</span>
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
      <span>Continue</span>
    </button>
  );
};

export default Signin;
