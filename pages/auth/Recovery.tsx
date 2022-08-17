import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/recovery.module.css";
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

interface RecoveryResponse {
  expires_at: string;
  id: string;
  issued_at: Date;
  request_url: string;
  state: string;
  type: string;
  ui: {
    action: string;
    method: string;
    nodes: UiNode[];
  };
}

const Recovery = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [flow, setFlow] = useState<SelfServiceRecoveryFlow>();
  const { ory } = useSelector((state: any) => state.auth);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [isSent, setIsSent] = useState<boolean>(false);

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
  };

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
      </div>{" "}
      <div className={styles.container}>
        <div className="container d-flex flex-column align-items-center ms-0 px-0">
          <h4 className="col-8 px-0 ms-0">
            <b>Reset Your Password</b>
            <p className={`${styles.header_text} pt-2 mb-4`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe at
              veniam autem soluta reiciendis repellat.
            </p>
          </h4>
          <div className="form-floating mb-4 col-8 px-0">
            <form method="post" onSubmit={onSubmit}>
              <input value={csrfToken} id="csrf_token" type="hidden" />
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="text"
                className="form-control"
                placeholder="Enter your email address"
              />
              <label htmlFor="email"> Email </label>
              <div className="col-8 ">
                <a
                  href="#"
                  className={`${styles.button} btn btn-red w-100 py-1`}
                >
                  <button type="submit"> Reset Password</button>
                </a>
                {isSent ? <span><h4>Recovery Email Sent</h4></span> : null}
              </div>
            </form>
          </div>

          <Link className={styles.a} href="/auth/login">
            <p
              className={`${styles.return_text} col-8 d-flex ms-0 justify-content-center px-0`}
            >
              Return to Sign-In
            </p>
          </Link>
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
          <p>Privacy & Terms</p>
        </a>
      </div>
    </div>
  );
};

export default Recovery;
