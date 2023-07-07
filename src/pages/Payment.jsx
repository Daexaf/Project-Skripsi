import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL2 } from "../utils/constants";

const PaymentForm = () => {
  const { id } = useParams();
  const { dataUser, setDataUser } = useState();
  const { dataKeranjang, setDataKeranjang } = useState();

  // useEffect(() => {
  //   axios
  //     .get(API_URL2 + `table/${id}`)
  //     .then((res) => {
  //       console.log(res.data.data[0]);
  //       setDataUser(res.data.data[0]);
  //     })
  //     .catch((error) => {
  //       console.log("Error yaa ", error);
  //     });

  //   axios
  //     .get(API_URL2 + `keranjangs?id_tables=${id}`)
  //     .then((res) => {
  //       console.log(res.data.data, "ini resnya");
  //       setDataKeranjang(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error yaa ", error);
  //     });
  // }, [id]);

  //SAMPLE REQUEST START HERE

  const midtransClient = require("midtrans-client");
  // Create Snap API instance
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: "SB-Mid-server-o8AeFK89-NJwJwf6QY1RMTgu",
  });

  let parameter = {
    transaction_details: {
      order_id: "YOUR-ORDERID-123456",
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "budi",
      last_name: "pratama",
      email: "budi.pra@example.com",
      phone: "08111222333",
    },
  };

  snap.createTransaction(parameter).then((transaction) => {
    // transaction token
    let transactionToken = transaction.token;
    console.log("transactionToken:", transactionToken);
  });

  return (
    <div>
      {/* Formulir pembayaran */}
      {/* <button onClick={handlePayment} disabled={loading}></button> */}
      <p>tes</p>
    </div>
  );
};

export default PaymentForm;
