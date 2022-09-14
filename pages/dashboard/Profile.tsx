import { NextPage } from "next";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import WithHeader from '../../components/SingleLineHeader'
import InnerFooter from "../../components/InnerFooter";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import { useSelector } from "react-redux";
import SubmitButton from "../../components/SubmitButton";
import {
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody,
} from "@ory/client";
import { AxiosError } from "axios";
import { NextPageWithLayout } from "../../typescript/types";

const Profile: NextPageWithLayout = () => {
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

  // useEffect(() => {
  //   // If the router is not ready yet, or we already have a flow, do nothing.
  //   if (!router.isReady || flow) {
  //     return;
  //   }

  //   // If ?flow=.. was in the URL, we fetch it
  //   if (flowId) {
  //     ory
  //       .getSelfServiceSettingsFlow(String(flowId))
  //       .then(({ data }: { data: SelfServiceSettingsFlow }) => {
  //         setFlow(data);
  //         setCsrfToken(
  //           (
  //             data.ui.nodes.find(
  //               (x) => (x.attributes as any).name == "csrf_token"
  //             )?.attributes as any
  //           ).value
  //         );
  //       })
  //       .catch(handleFlowError(router, "settings", setFlow));
  //     return;
  //   }

  //   // Otherwise we initialize it
  //   ory
  //     .initializeSelfServiceSettingsFlowForBrowsers(
  //       returnTo ? String(returnTo) : undefined
  //     )
  //     .then(({ data }: { data: SelfServiceSettingsFlow }) => {
  //       setFlow(data);
  //     })
  //     .catch(handleFlowError(router, "settings", setFlow));
  // }, [ory, flowId, router, router.isReady, returnTo, flow]);

  // const onSubmit = (event: any) => {
  //   event.preventDefault();
  //   setIsBusy(true);
  //   const body: SubmitSelfServiceSettingsFlowBody = {
  //     csrf_token: event.target.csrf_token.value,
  //     password: event.target.password.value,
  //     method: "password",
  //   };

  //   ory
  //     .submitSelfServiceSettingsFlow(String(flow?.id), body)
  //     .then(({ data }: { data: SelfServiceSettingsFlow }) => {
  //       // The settings have been saved and the flow was updated. Let's show it to the user!
  //       console.log(data);
  //       setFlow(data);
  //     })
  //     .catch(handleFlowError(router, "settings", setFlow))
  //     .catch(async (err: AxiosError<any, any>) => {
  //       // If the previous handler did not catch the error it's most likely a form validation error
  //       if (err.response?.status === 400) {
  //         // Yup, it is!
  //         setFlow(err.response?.data);
  //         return;
  //       }

  //       return Promise.reject(err);
  //     });
  //   setIsBusy(false);
  // };
  return (
    <>
      <Head>
        <title>Arcton | Change Password</title>
      </Head>
      <section>
        <form method="post">
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

      <section className="wrapper bg-gray">
        <div className="container pt-15 pt-md-12 pb-13 pb-md-15 px-2">
          <div className="col-12 col-lg-10 m-2 rounded bg-light shadow-lg p-2">
            <h1>Profile</h1>
            <div className="row">
              <div className="col-5 p-2">
                  <h6>E-mail:</h6>
                  <input type="email" placeholder="E-mail" className="w-100 border-0 bg-gray"/>
              </div>

              <div className="col-12 row">
                <div className="d-flex justify-content-between align-items-center col-5 col-md-4 col-lg-3">
                 <h6>Status:</h6>
                  <div className="bg-green p-2 text-white rounded">Verified</div>
                </div>
                <div className="col-1 col-lg-5 col-xl-4"></div>
                <div className="col-6 col-lg-4 col-xl-3 d-flex justify-content-end">
                <button className="btn-primary rounded border-0 p-2">Change E-mail</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-10  m-2 rounded bg-light shadow-lg p-2">
            <h1>Identity</h1>
            <div className="row">
              <div className="col-12 row">
                <div className="col-5 p-2">
                    <h6>First Name:</h6>
                    <input type="email" placeholder="E-mail" className="w-100 border-0 bg-gray"/>
                </div>
                <div className="col-5 p-2">
                    <h6>Last Name:</h6>
                    <input type="email" placeholder="E-mail" className="w-100 border-0 bg-gray"/>
                </div>

                <div className="col-5 p-2">
                    <h6>Date of Birth:</h6>
                    <input type="date" placeholder="E-mail" className="w-100 border-0 bg-gray"/>
                </div>
                <div className="col-5 p-2">
                    <h6>Nationality:</h6>
                    <input type="email" placeholder="E-mail" className="w-100 border-0 bg-gray"/>
                </div>
                <div className="col-5 p-2">
                    <h6>Document Nr:</h6>
                    <input type="email" placeholder="E-mail" className="w-100 border-0 bg-gray"/>
                </div>
                <div className="col-5 p-2">
                    <h6>Expiery Date:</h6>
                    <input type="Date" placeholder="E-mail" className="w-100 border-0 bg-gray"/>
                </div>
              </div>


              <div className="col-12 row">
                <div className="d-flex justify-content-between align-items-center col-5 col-md-4 col-lg-3">
                 <h6>Status:</h6>
                  <div className="bg-green p-2 text-white rounded">Verified</div>
                </div>
                <div className="col-1 col-lg-5 col-xl-4"></div>
                <div className="col-6 col-lg-4 col-xl-3 d-flex justify-content-end">
                <button className="btn-primary rounded border-0 p-2">Submit New KYC</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Profile.getLayout = function (page: ReactElement) {
  return (
    <>
      <div className="row bg-gray">
        <div className="col-12 col-lg-3 col-xl-2 col-xxl-2 col-12 mt-12 bg-gray">
        <WithHeader extraStyles="" />
        </div>
        <div className="col-12 col-lg-9 col-col-xl-10 col-xxl-10 col-12">
          <div>{page}</div>
        </div>
        <div className="mt-17">
        <InnerFooter extraStyles=""/>
        </div>
      </div>
    </>
  )
}
export default Profile;

