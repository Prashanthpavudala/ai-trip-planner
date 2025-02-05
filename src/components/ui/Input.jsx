"use client";

import React from "react";

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${className}`}
      {...props}
    />
  );
};

export { Input };
