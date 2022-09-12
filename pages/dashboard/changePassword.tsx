import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import SubmitButton from "../../components/SubmitButton";
import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowWithPasswordMethodBody,
} from "@ory/client";
import { AxiosError } from "axios";

const ChangePassword: NextPage = () => {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>();
  const { ory } = useSelector((state: any) => state.auth);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { cookie } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const { flow: flowId, return_to: returnTo } = router.query;
  const dispatch = useDispatch();

  const handleFlowError = (
    router: NextRouter,
    page: string,
    callback: Function
  ) => {};

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

   

    // Otherwise we initialize it
    ory
      .initializeSelfServiceSettingsFlowForBrowsers(
        returnTo ? String(returnTo) : undefined , {credentials: 'include'}
      )
      .then(({ data }: { data: SelfServiceSettingsFlow }) => {
        setFlow(data);
        setCsrfToken(
            (
              data.ui.nodes.find(
                (x) => (x.attributes as any).name == "csrf_token"
              )?.attributes as any
            ).value);
      })
      .catch(handleFlowError(router, "settings", setFlow));
  }, [ory, flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsBusy(true);

    const password =
      event.target.password.value === event.target.password2.value &&
      event.target.password2.value.length > 8
        ? event.target.password.value
        : null;

    const body: SubmitSelfServiceSettingsFlowWithPasswordMethodBody = {
      csrf_token: event.target.csrf_token.value,
      method: "password",
      password: String(password),
    };
    console.log(body);
    ory
      .submitSelfServiceSettingsFlow(String(flow?.id), body, undefined, undefined, {credentials: 'include'})
      .then(({ data }: { data: SelfServiceSettingsFlow }) => {
        // The settings have been saved and the flow was updated. Let's show it to the user!
        
        setFlow(data);
      })
      .catch(handleFlowError(router, "settings", setFlow))
      .catch(async (err: AxiosError<any, any>) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          setFlow(err.response?.data);
          return;
        }

        return Promise.reject(err);
      });

    setIsBusy(false);
    setIsSent(true);
  };

  return (
    <>
      <Head>
        <title>Arcton | Change Password</title>
      </Head>
      <section>
        <form method="post" onSubmit={onSubmit}>
          <input value={csrfToken} id="csrf_token" type="hidden" />
          <div className="form-floating mb-4">
            {
              isSent ? (
                <div className="alert alert-success">
                  Your password has been changed successfully!
                </div>
              ) : null // <p className={`mt-2 mb-4 row-1`}>Enter New Password</p>
            }
            <div>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="New Password"
              />
              <label htmlFor="textInputExample">New Password</label>
            </div>
            <div>
              <input
                id="password2"
                type="password"
                className="form-control"
                placeholder="New Password"
              />
              <label htmlFor="textInputExample">Re-Enter Password</label>
            </div>
            {SubmitButton(isBusy)}
          </div>
        </form>
      </section>
    </>
  );
};

export default ChangePassword;
