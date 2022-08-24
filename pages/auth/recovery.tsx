import React, { ReactElement, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import companyLogo from "../../public/assets/img/logo.png";
import {
  SelfServiceRecoveryFlow,
  SubmitSelfServiceRecoveryFlowBody,
} from "@ory/client";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";
import { UiNode } from "../../typescript/interfaces";
import SubmitButton from "../../components/SubmitButton";
import { WithFooter } from "../../components/SingleLineFooter";

const Recovery = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [flow, setFlow] = useState<SelfServiceRecoveryFlow>();
  const { ory } = useSelector((state: any) => state.auth);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  // Get ?flow=... from the URL
  const router = useRouter();
  const { flow: flowId, return_to: returnTo } = router.query;

  const handleFlowError = (err: any, flowId: string, func: Function) => {};

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceRecoveryFlow(String(flowId))
        .then(({ data }: { data: SelfServiceRecoveryFlow }) => {
          // console.log(data)
          setFlow(data);
          setCsrfToken(
            (
              data.ui.nodes.find(
                (x) => (x.attributes as any).name == "csrf_token"
              )?.attributes as any
            ).value
          );
        })
        .catch(handleFlowError(router, "recovery", setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceRecoveryFlowForBrowsers()
      .then(({ data }: { data: SelfServiceRecoveryFlow }) => {
        console.log(data);
        setFlow(data);

        setCsrfToken(
          (
            data.ui.nodes.find(
              (x) => (x.attributes as any).name == "csrf_token"
            )?.attributes as any
          ).value
        );
      })
      .catch(handleFlowError(router, "recovery", setFlow))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400 && err.response?.data) {
          // Yup, it is!
          setFlow(err.response?.data as any);
          return;
        }

        return Promise.reject(err);
      });
  }, [flowId, router, router.isReady, returnTo, flow, ory]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsBusy(true);
    let body: SubmitSelfServiceRecoveryFlowBody = {
      csrf_token: event.target.csrf_token.value,
      email: event.target.email.value,
      method: "link",
    };
    ory
      .submitSelfServiceRecoveryFlow(String(flow?.id), body)
      .then(({ data }: { data: SelfServiceRecoveryFlow }) => {
        // Form submission was successful, show the message to the user!
        setFlow(data);
        setIsSent(true);
      })
      .catch(handleFlowError(router, "recovery", setFlow))
      .catch((err: AxiosError<any, any>) => {
        switch (err.response?.status) {
          case 400:
            // Status code 400 implies the form validation had an error
            setFlow(err.response?.data);
            return;
        }

        throw err;
      });
    setIsBusy(false);
  };

  return (
    <main>
      <Head>
        <title>Account Recovery | Arcton</title>
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
                  <h2 className="mb-2 text-start">Reset your password</h2>

                  {isSent ? (
                    <div className="alert alert-success">
                      An email containing a recovery link has been sent to the
                      email address you provided.
                    </div>
                  ) : (
                    <p className={`mt-2 mb-4 row-1`}>
                      Enter an email address associated with your account and we
                      will send you a link to reset your password.
                    </p>
                  )}
                  <form
                    method="post"
                    className="text-start mb-3"
                    onSubmit={onSubmit}
                  >
                    <input value={csrfToken} id="csrf_token" type="hidden" />
                    <div className="form-floating mb-6">
                      <input
                        ref={emailRef}
                        id="email"
                        name="email"
                        type="text"
                        tabIndex={1}
                        className="form-control"
                        placeholder="Enter your email address"
                      />
                      <label htmlFor="email">Email</label>
                    </div>

                    {SubmitButton(isBusy)}
                  </form>

                  <Link href="/auth/login">
                    <a className="d-block text-center w-100 mb-2 fs-15">
                      Return to Sign-In
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

Recovery.getLayout = WithFooter("mx-auto");


export default Recovery;
