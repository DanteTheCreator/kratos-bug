import React, { ReactElement, useEffect, useRef, useState } from "react";
import WithHeader from '../../components/SingleLineHeader'
import InnerFooter from "../../components/InnerFooter";

const Wallet = () => {
  return ( 
    <section id="snippet-1" className="wrapper bg-gray">
      <div className="container pt-15 pt-md-12 pb-13 pb-md-15 px-2">
        <h1>Wallet And Payment Methods</h1>
        <div className="col-sm-12 col-lg-10 col-xl-8 m-2 rounded bg-light shadow-lg p-2">
          <h4 className="text-red">Wallet</h4>

          <table className="table table-hover table-bordered shadow-lg p-0 m-0 col-12 fs-13">
            <tbody>
              <tr>
                <th>Adress</th>
                <th>actions</th>
              </tr>

              <tr>
                <td>0x00000000000000000000</td>
                <td>Un-link</td>
              </tr>
              <tr>
                <td>0x00000000000000000000</td>
                <td>Un-link</td>
              </tr>
            </tbody>
            </table>
        </div>

        <div className="col-sm-12 col-lg-10 col-xl-8 m-2 rounded bg-light shadow-lg p-2">
          <h4 className="text-red">Payment Methods</h4>
          <p>Check waht payment methods are available to you:</p>
          <select name="payments" id="paymentMethods" className="border-0 rounded bg-gray p-2">
            <option value="Bank-transfer">Bank-transfer</option>
            <option value="Bank-transfer">Paypal</option>
            <option value="Bank-transfer">Cash</option>
          </select>
        </div>
      </div>
    </section>
  )
}

Wallet.getLayout = function (page: ReactElement) {
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
export default Wallet