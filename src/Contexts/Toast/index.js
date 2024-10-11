// ToastContext.js
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastConfig, setToastConfig] = useState({});

  const showToast = (message, type) => {
    setToastConfig({ message, type });
  };

  const closeToast = () => {
    setToastConfig({});
  };

  const show = () => {
    const { message, type } = toastConfig;
    toast[type](message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: closeToast,
    });
  };

  return <ToastContext.Provider value={{ showToast, show }}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
