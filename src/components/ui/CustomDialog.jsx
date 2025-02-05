"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";


export const CustomDialog = ({ isOpen, onClose, login }) => {

  // const login = useGoogleLogin({
  //   onSuccess: (codeRes) => getUserProfile(codeRes),
  //   onError: (error) => console.log(error),
  // });

  // const getUserProfile = (tokenInfo) => {
  //   axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
  //     headers: {
  //       Authorization: `Bearer ${tokenInfo?.access_token}`,
  //       Accept: 'application/json',
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //     localStorage.setItem('user',JSON.stringify(response?.data));

  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // };

  return (
    <div className={`${isOpen ? "fixed inset-0 flex items-center justify-center bg-black/50" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img src="/logo.svg" alt="Logo" className="w-16 h-16 mb-4" />

          {/* Title */}
          <h2 className="font-bold text-lg mt-2">Sign In With Google</h2>

          {/* Description */}
          <p className="text-gray-600 text-center mt-2">
            Sign in to the App with Google authentication securely.
          </p>

          {/* Button */}
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
            onClick={() => {
              onClose(); // ✅ Close the dialog
              login();   // ✅ Trigger Google login
            }}
          >
            <FcGoogle className="text-xl" />
            <span>Sign In With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
