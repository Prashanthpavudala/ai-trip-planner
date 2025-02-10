"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";


export const CustomDialog = ({ isOpen, onClose, login }) => {

  return (
    <div className={`${isOpen ? "fixed inset-0 flex items-center justify-center bg-black/50" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex flex-col items-center">

          <img src="/logo.svg" alt="Logo" className="w-16 h-16 mb-4" />

          <h2 className="font-bold text-lg mt-2">Sign In With Google</h2>

          <p className="text-gray-600 text-center mt-2">
            Sign in to the App with Google authentication securely.
          </p>

          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
            onClick={() => {
              onClose(); 
              login();   
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
