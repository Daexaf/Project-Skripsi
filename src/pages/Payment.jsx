import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Mengirim permintaan pembayaran ke server Node.js
      const response = await axios.post("/process-payment");

      // Mengarahkan pengguna ke halaman pembayaran Midtrans
      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error(error);
      // Menampilkan pesan error jika terjadi kesalahan
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Formulir pembayaran */}
      <button onClick={handlePayment} disabled={loading}></button>
    </div>
  );
};

export default PaymentForm;
