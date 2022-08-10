import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import companyLogo from "../../public/assets/img/logo.png";
import { useRouter } from "next/router";
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

  const router = useRouter()

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [flowId, setFlowId] = useState<string>();
  const [action, setAction] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [session, setSession] = useState<Session>();
  const [logoutUrl, setLogoutUrl] = useState<string>();

  const getUserName = (identity: Identity) =>
  identity.traits.email || identity.traits.username


  useEffect(() => {
    isLoggedIn && router.push('/marketplace/');

    ory
    .toSession()
    .then(({ data }) => {
      // User has a session!
      setSession(data)
      ory.createSelfServiceLogoutFlowUrlForBrowsers().then(({ data }) => {
        // Get also the logout url
        setLogoutUrl(data.logout_url)
        setIsLoggedIn(true)
      })
    })
    .catch((err) => {
      console.error(err)
      // Redirect to login page
      window.location.replace(`${basePath}/ui/login`)
    })

    ory.initializeSelfServiceLoginFlowForBrowsers(false).then(
      response => {      
        setCsrfToken((response.data.ui.nodes.find(x => (x.attributes as any).name == 'csrf_token')?.attributes as any).value);
        setFlowId(response.data.id);
        setAction(response.data.ui.action);
      }
    );
  }, [isLoggedIn, router]);

  const handleLogin = (event:any) => {
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
    <main>
      <Head>
        <title>Login | Arcton</title>
      </Head>
    
      <section className="wrapper bg-light">
        <div className="container pb-14 pb-md-16">
          <div className="row">
            <div className="col-lg-7 col-xl-6 col-xxl-5 mx-auto">

              <div className="col-3 my-10 ps-3">
              <Image
                  src={companyLogo}
                  alt="Arcton"
                />
              </div>

              <div className="card">
                <div className="card-body p-11">
                  
                  <h2 className="mb-6 text-start">Sign in to your account</h2>
                  
                  <form
                      action={action}
                      method="post"
                      className="text-start mb-3"
                      onSubmit={handleLogin}
                    >
                      <input
                          value={csrfToken}
                          id="csrf_token"
                          type="hidden"
                        />
                      <div className="form-floating mb-3">
                        <input
                          ref={emailRef}
                          id="loginEmail"
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          tabIndex={1}
                        />
                        <label htmlFor="loginEmail">Email</label>
                      </div>
                      <div className="text-end pb-1 fs-13">
                        <Link className="" href="/authentication/Recovery">
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
                            tabIndex={2}
                          />
                        <span className="password-toggle"><i className="uil uil-eye"></i></span>
                        <label htmlFor="loginPassword">Password</label>
                      </div>
                      
                      <input className="btn btn-primary btn-login w-100 mb-2" tabIndex={3} type="submit" value="Continue" />

                    </form>

                </div>
              </div>

              <p className="text-start pt-4 fs-13 ps-3">
                Don&#39;t have an account? <Link className="" href="/auth/recovery">Sign up</Link>
              </p>
              
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Signin;
