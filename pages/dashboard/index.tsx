import React, { ReactElement, useEffect, useRef, useState } from "react";
import WithHeader from '../../components/SingleLineHeader'
import InnerFooter from "../../components/InnerFooter";

const Dashboard = () => {
  return (
    <section id="snippet-1" className="wrapper bg-light">
    <div className="container pt-15 pt-md-17 pb-13 pb-md-15">
      <div className="row gx-lg-8 gx-xl-12 gy-10 justify-content-center">
        
        
        <div className="col-lg-6">
          <h2 className="display-4 mb-3">Welcome</h2>
          
          <p className="mb-6">Thanks for signing up. Currently there is not much to show here. We&aposre hard at work developing our marketplace and will be releasing a new version soon.</p>
          
        </div>
      </div>
    </div>
  
  </section> 
  )
}

Dashboard.getLayout = function (page: ReactElement) {
  return (
    <>
    <WithHeader extraStyles="" />
    <div>{page}</div>
    <InnerFooter extraStyles=""/>
        </>
  )
}
export default Dashboard