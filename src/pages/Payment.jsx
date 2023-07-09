import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL2 } from "../utils/constants";
import { Helmet } from "react-helmet";

const PaymentForm = () => {
  const { id } = useParams();
  const { dataUser, setDataUser } = useState();
  const { dataKeranjang, setDataKeranjang } = useState();

  // useEffect(() => {
  //   // You can also change below url value to any script url you wish to load,
  //   // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
  //   const midtransScriptUrl = "https://app.midtrans.com/snap/snap.js";

  //   let scriptTag = document.createElement("script");
  //   scriptTag.src = midtransScriptUrl;

  //   // Optional: set script attribute, for example snap.js have data-client-key attribute
  //   // (change the value according to your client-key)
  //   const myMidtransClientKey = "SB-Mid-client-3x1AxTOk89GduFm7";
  //   scriptTag.setAttribute(
  //     "SB-Mid-client-3x1AxTOk89GduFm7",
  //     myMidtransClientKey
  //   );

  //   document.body.appendChild(scriptTag);

  //   return () => {
  //     document.body.removeChild(scriptTag);
  //   };
  // }, []);

  const handlePayButton = (e) => {
    window.snap.pay("ea70efa7-addc-4b70-9dc0-bef2f2c4f28f", {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  };

  // Then somewhere else on your React component, `window.snap` global object will be available to use
  // e.g. you can then call `window.snap.pay( ... )` function.

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- @TODO: replace SET_YOUR_CLIENT_KEY_HERE with your client key --> */}
        <script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-3x1AxTOk89GduFm7"
        ></script>
        {/* <!-- Note: replace with src="https://app.midtrans.com/snap/snap.js" for Production environment --> */}
      </Helmet>

      <button
        id="pay-button"
        onClick={(e) => {
          handlePayButton(e);
        }}
      >
        Pay!
      </button>
    </>
  );
};

export default PaymentForm;
