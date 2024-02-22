import React, { useState } from "react";
import {generateOtp} from "../Services/AuthServices.js"
import { verifyUser } from "../Services/AuthServices.js";
import OTPInput from "otp-input-react";
import "./loader.css";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    let data = { email, otp: OTP }; // Create data object with current email and OTP
    let response;
    if (otpGenerated) {
      console.log(data)
      response = await verifyUser(data); // Call verifyUser if OTP is generated
      if (response) {
        setOtpGenerated(false);
        navigate('/home');

      }
      setIsLoading(false);

    } else {
      response = await generateOtp({ email }); // Otherwise, generate OTP
      if (response) {
        setOtpGenerated(true);
      }
      setIsLoading(false);

    }
  };

  return (
    <>

    {isLoading ? (
      <div className=" h-[70vh]  flex justify-center items-center mx-auto">
        <div className="loader "></div>
      </div>
    )
    :(
    <div className="flex justify-center items-center h-[100vh] w-[100vw] ">
      <form
        onSubmit={handleFormSubmit}
        className="flex justify-center flex-col items-center mx-auto"
      >
        <div className="w-full flex gap-5 ">
          <label htmlFor="email" className="text-xl">
            Email address:
           
          </label>
          <input
              type="email"
              placeholder="Enter your email address"
              className="border-2 p-1 ms-2 rounded-md focus:outline-none"
              value={email}
              readOnly={otpGenerated}
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        

        {otpGenerated ? (
  <div className="w-full flex gap-7 justify-between mt-3">
    <label htmlFor="otp" className="text-xl flex">Enter the OTP: </label>
    <div className="">
      <OTPInput
      value={OTP}
      name="otp"
      onChange={setOTP}
      autoFocus
      OTPLength={4}
      otpType="number"
      disabled={false}
      secure
      className="focus:outline-none "
    />
    </div>
    
  </div>
) : null}



        <button
          type="submit"
          className="px-4 py-1.5 bg-green-600 text-white border-none rounded-md mt-2 text-center"
        >
          {otpGenerated ? "Verify OTP" : "Generate OTP"}
        </button>
      </form>
    </div>
    )}
    </>
  );
  
};

export default AuthPage;
