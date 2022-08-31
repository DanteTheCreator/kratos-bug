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
import Card from "../../components/Card";

const Profile: NextPage = () => {
  const [flow, setFlow] = useState<SelfServiceSettingsFlow>();
  const { ory } = useSelector((state: any) => state.auth);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("test@arcton.com");
  const [isVerified, setIsVerified] = useState<boolean>();

  const router = useRouter();
  const { flow: flowId, return_to: returnTo } = router.query;

  const handleFlowError = (
    router: NextRouter,
    page: string,
    callback: Function
  ) => {};

  const handleChangePassword = () => {
    router.push({
      pathname: "/dashboard/changePassword",
      query: { flowId: flow?.id },
    });
  };

  const handleChangeEmail = async () => {
    const session = await ory.toSession();
    console.log(session);
  };

  useEffect(() => {
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
        console.log(data);
      })
      .catch(handleFlowError(router, "settings", setFlow));
  }, [ory, router, flow, flowId, returnTo]);

  return (
    <>
      <Head>
        <title> Arcton | Profile </title>
      </Head>
      <section>
        <Card>
          <>
            <h2>Profile:</h2>
            <h5>Email:</h5>
            <h5>{email}</h5>
            <h5>Status:</h5>
            <h5>{isVerified ? "Verified" : "Unverified"}</h5>
            <button
              type="button"
              onClick={handleChangeEmail}
              value="Change Password"
              className="btn btn-orange rounded-pill"
            >
              Change Email
            </button>
          </>
        </Card>
        <Card>
          <>
            <button
              type="button"
              onClick={handleChangePassword}
              value="Change Password"
              className="btn btn-orange rounded-pill"
            >
              Change Password
            </button>
          </>
        </Card>
      </section>
    </>
  );
};

export default Profile;
