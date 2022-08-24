import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
import SubmitButton from "../../components/SubmitButton";
import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from "@ory/client";
import { AxiosError } from "axios";

const Profile: NextPage = () => {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>();
  const { ory } = useSelector((state: any) => state.auth);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const router = useRouter();
  const { flow: flowId, return_to: returnTo } = router.query;

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

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getSelfServiceSettingsFlow(String(flowId))
        .then(({ data }: { data: SelfServiceSettingsFlow }) => {
          setFlow(data);
          setCsrfToken(
            (
              data.ui.nodes.find(
                (x) => (x.attributes as any).name == "csrf_token"
              )?.attributes as any
            ).value
          );
        })
        .catch(handleFlowError(router, "settings", setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .initializeSelfServiceSettingsFlowForBrowsers(
        returnTo ? String(returnTo) : undefined
      )
      .then(({ data }: { data: SelfServiceSettingsFlow }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, "settings", setFlow));
  }, [ory, flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsBusy(true);
    const body: SubmitSelfServiceSettingsFlowBody = {
      csrf_token: event.target.csrf_token.value,
      password: event.target.password.value,
      method: "password",
    };

    ory
      .submitSelfServiceSettingsFlow(String(flow?.id), body)
      .then(({ data }: { data: SelfServiceSettingsFlow }) => {
        // The settings have been saved and the flow was updated. Let's show it to the user!
        console.log(data);
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
            {isSent ? (
              <div className="alert alert-success">
                Your password has been changed successfully!
              </div>
            ) : (
              null// <p className={`mt-2 mb-4 row-1`}>Enter New Password</p>
            )}
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="New Password"
            />
            <label htmlFor="textInputExample">New Password</label>
            {SubmitButton(isBusy)}
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
