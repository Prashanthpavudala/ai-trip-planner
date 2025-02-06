"use client";

import React, { useState, useRef, useEffect } from "react";

const Popover = ({ trigger, content, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-48 p-4 bg-white border border-gray-300 rounded-lg shadow-lg ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export { Popover };