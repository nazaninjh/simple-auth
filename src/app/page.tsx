import LoginComponent from "@/components/auth/login/login.component";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WrapperComponent from "@/components/wrapper/wrapper.component";

const page = () => {
  return (
    <WrapperComponent>
      <ToastContainer />
      <LoginComponent />
    </WrapperComponent>
  );
};

export default page;
