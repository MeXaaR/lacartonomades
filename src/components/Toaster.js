import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toasty = (message, type = "info", options = {}) =>
  toast(message, {
    position: "bottom-right",
    autoClose: 5000,
    type,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    ...options,
  });

function Toaster() {
  global.msg = {
    error: (text, options) => toasty(text, "error", options || {}),
    info: (text, options) => toasty(text, "info", options || {}),
    success: (text, options) => toasty(text, "success", options || {}),
    warning: (text, options) => toasty(text, "warning", options || {}),
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Toaster;
