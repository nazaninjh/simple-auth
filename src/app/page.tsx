import LoginComponent from "@/components/login/login.component";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/providers/auth.provider";
import WrapperComponent from "@/components/wrapper/wrapper.component";
const page = () => {
  return (
    <AuthProvider>
      <WrapperComponent>
        <ToastContainer />
        <LoginComponent />
      </WrapperComponent>
    </AuthProvider>
  );
};

export default page;
