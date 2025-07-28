import LoginComponent from "@/components/auth/login/login.component";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/providers/auth.provider";
import WrapperComponent from "@/components/wrapper/wrapper.component";
import ReactRouterProvider from "@/providers/reactRouter.provider";
const page = () => {
  return (
    <ReactRouterProvider>
      <AuthProvider>
        <WrapperComponent>
          <ToastContainer />
          <LoginComponent />
        </WrapperComponent>
      </AuthProvider>
    </ReactRouterProvider>
  );
};

export default page;
