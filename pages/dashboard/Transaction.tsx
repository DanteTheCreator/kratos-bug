import React, { ReactElement, useEffect, useRef, useState } from "react";
import WithHeader from '../../components/SingleLineHeader'
import InnerFooter from "../../components/InnerFooter";

const Transaction = () => {
  return (
    <section id="snippet-1" className="wrapper bg-gray">
    <div className="container pt-15 pt-md-12 pb-13 pb-md-15 px-2">
      <h1>Security</h1>
      <div className="row">
        <div className="col-12 col-lg-8 my-2 rounded bg-light shadow-lg p-2">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi sequi optio vero,
           alias nam reprehenderit illo obcaecati dicta vitae expedita maiores assumenda praesentium sit
            animi voluptate beatae, odio libero. Odio numquam atque officiis. Totam debitis magni architecto
             accusamus rerum dolor
            </p>       
        </div>

        
        <div className="col-12 col-lg-10 col-xl-8 rounded shadow-lg m-0 p-0 table-responsive">
        <table className="table table-hover shadow-lg p-0 m-0 col-12 fs-13">
          <tbody>
              <tr className="">
                <th className="border-right">Invested in</th>
                <th className="">When</th>
                <th className="">Amount</th>
                <th className="">Shares</th>
                <th className="">Via</th>
                <th className="">View</th>
              </tr>

              <tr>
                <td>Google</td>
                <td>19/02/2022</td>
                <td>2000</td>
                <td>60</td>
                <td>Bank-transfer</td>
                <td>view</td>
              </tr>

              <tr>
                <td>Google</td>
                <td>19/02/2022</td>
                <td>2000</td>
                <td>60</td>
                <td>Bank-transfer</td>
                <td>view</td>
              </tr>
              </tbody>
            </table>
        </div>

      </div>
      </div>
      </section>
  )
}
Transaction.getLayout = function (page: ReactElement) {
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

export default Transaction