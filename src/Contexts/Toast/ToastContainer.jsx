import { ToastContainer } from "react-toastify";

export const CustomToastContainer = () => {
  return (
    <ToastContainer
      style={{
        fontSize: 14,
      }}
      position="bottom-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      draggable
    />
  );
};
