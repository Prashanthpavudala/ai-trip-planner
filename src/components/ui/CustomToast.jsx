"use client";

import { motion } from "framer-motion";
import { Toast, ToastProvider, ToastViewport } from "@radix-ui/react-toast";

const CustomToast = ({ message, open, setOpen, duration = 3000 }) => {
  return (
    <ToastProvider swipeDirection="right">
      <Toast
        open={open}
        onOpenChange={setOpen}
        duration={duration}
        className="fixed bottom-5 right-5 p-0"
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}  // Start off-screen (right)
          animate={{ x: 0, opacity: 1 }}    // Animate in
          exit={{ x: 100, opacity: 0 }}     // Animate out
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="bg-black text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold"
        >
          {message}
        </motion.div>
      </Toast>

      <ToastViewport className="fixed bottom-0 right-0 p-4" />
    </ToastProvider>
  );
};

export { CustomToast };
