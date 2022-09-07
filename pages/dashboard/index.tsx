import React, { ReactElement, useEffect, useRef, useState } from "react";
import WithHeader from '../../components/SingleLineHeader'
import InnerFooter from "../../components/InnerFooter";
import styles from "../../styles/index.module.css";

const Dashboard = () => {
  return (
    <section id="snippet-1" className="wrapper bg-light">
    <div className="container pt-15 pt-md-12 pb-13 pb-md-15">
      <div className="row gx-lg-8 gx-xl-12 gy-10 justify-content-start">
        
        
        <div className="col-lg-6">
          <h1 className="display-4 mb-3">Welcome</h1>
          <p className="mb-6">Thanks for signing up. Currently there is not much to show here. 
                              We're hard at work developing our marketplace and will be releasing a new version soon.
          </p>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-5 m-md-2 border rounded">
            <div className="p-2">
              <h4>Your Identity</h4>
              <div className="d-flex justify-content-around p-2">
                <h6>Your Email:</h6>
                <div className="bg-success p-2 text-white rounded">Verified</div>
              </div>
              <div className="d-flex justify-content-around align-items-center p-2">
                <h6>KYC</h6>
                <div className="bg-secondary p-2 text-white rounded">Not Completed</div>
              </div>
            </div>
          </div>

          <div className={`${styles.transaction}col-sm-12 col-md-5 m-md-2 border rounded`}>
            <div className="p-2">
              <h4>Transaction</h4>
              <div>
                Find your first investment
              </div>
            </div>
          </div>

          <div className="col-sm-10 col-md-5 m-2 border rounded">
            <div className="p-2">
              <h4>Security</h4>
              <div className="d-flex justify-content-around align-items-center p-2">
                <h6>2FA status</h6>
                <div className="bg-secondary p-2 text-white rounded">2FA disabled</div>
              </div>
            </div>        
          </div>

          <div className="col-sm-9 col-md-5 m-2 border rounded">
            <div className="p-2">
            <h4>Wallet & Payment Methods</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </section> 
  )
}

Dashboard.getLayout = function (page: ReactElement) {
  return (
    <>
      <div className="row">
        <div className="col-md-2 col-12 mt-12">
        <WithHeader extraStyles="" />
        </div>
        <div className="col-md-10 col-12">
          <div>{page}</div>
        </div>
        <div className="mt-16">
        <InnerFooter extraStyles=""/>
        </div>
      </div>
    </>
  )
}
export default Dashboard