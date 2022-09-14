import React, { ReactElement, useEffect, useRef, useState } from "react";
import WithHeader from '../../components/SingleLineHeader'
import InnerFooter from "../../components/InnerFooter";

const Security = () => {
  return (
    <section id="snippet-1" className="wrapper bg-gray">
    <div className="container pt-15 pt-md-12 pb-13 pb-md-15">
      <h1>Security</h1>
      <div className="row">
        <div className="col-12 col-lg-8 m-2 rounded bg-light shadow-lg p-2">
          <h4 className="text-red">Password</h4>
          <div className="row">
            <div >
              <p>You last Changed your password 20 days ago</p>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn-primary rounded border-0 p-2">Change Password</button>
            </div>
          </div>
          <div>

          </div>
        </div>

        <div className="col-12 col-lg-8 m-2 rounded bg-light shadow-lg p-2">
          <h4 className="text-red">Two-Factor Verification</h4>
          <div className="mb-4"> 
            <p>
              Two-Factor Verification is a method of protection for your web accoint. When it is activated,
              you need to enter not only your password, but also a special code. You can receive this code by in mobile app.
               Even if third person will find your password, they will not be able to access without that code. 
            </p>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 d-flex justify-content-between align-items-center">
                <p className="m-0">Status:</p>
                <div className="bg-ash p-2 text-white rounded border-0 py-1 fs-13">DISABLED</div>
            </div>
            <div className="col-0 col-md-3 col-xl-4"></div>
            <div className="col-12 col-md-4 col-xl-3">
              <button className="btn-primary col-12 rounded border-0 p-2">Enable 2FA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}

Security.getLayout = function (page: ReactElement) {
  return (
    <>
      <div className="row bg-gray">
        <div className="col-12 col-lg-3 col-xl-2 col-xxl-2 col-12 mt-12 bg-gray">
        <WithHeader extraStyles="" />
        </div>
        <div className="col-12 col-lg-9 col-col-xl-10 col-xxl-10 col-12">
          <div>{page}</div>
        </div>
        <div className="mt-15 mt-xl-20">
        <InnerFooter extraStyles=""/>
        </div>
      </div>
    </>
  )
}

export default Security