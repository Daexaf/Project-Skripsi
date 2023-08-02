import React, { useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OTPInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthPages = () => {
  const [otp, setOTP] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function onSignInSubmit() {
    setLoading(true);
    onCaptcVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onCaptcVerify() {
    if (!window.RecaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        navigate("/Home");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOption={{ duration: 4000 }} />
        <div id="recaptcha-container" className="recaptcha-container"></div>
        {user ? (
          <h3>berhasil</h3>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal font-medium text-3xl mb-6">
              Welcome to <br /> Sop Duren 97
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full ">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="font-bold text-2xl text-center">
                  Enter Your OTP
                </label>
                <OTPInput
                  value={otp}
                  onChange={setOTP}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autofocus
                  className="otp-container"
                ></OTPInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5  rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}

                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full ">
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor="" className="font-bold text-2xl text-center">
                  Please enter your Number
                </label>
                <PhoneInput country={"id"} value={ph} onChange={setPh} />
                <label htmlFor="" className="font-bold text-xl  text-center">
                  or login with
                </label>

                <button
                  onClick={onSignInSubmit}
                  className="bg-blue-600 w-full flex gap-1 items-center justify-center py-2.5 rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}

                  <span>Send OTP</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthPages;
