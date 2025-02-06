import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastTypes = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string | null;
  toastType?: ToastTypes;
}

const Toast: React.FC<ToastProps> = ({ message, toastType = "info" }) => {
  useEffect(() => {
    if (message) {
      toast(message, { type: toastType });
    }
  }, [message, toastType]);

  return (
    <ToastContainer
      position="top-center" 
      autoClose={3000}
      hideProgressBar={true}
      closeOnClick
      pauseOnHover={false}
      draggable
      theme="light"
    />
  );
};

export default Toast;