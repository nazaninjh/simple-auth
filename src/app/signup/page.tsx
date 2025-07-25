import SignupComponent from "@/components/auth/login/signup/signup.component";
import WrapperComponent from "@/components/wrapper/wrapper.component";
import { AuthProvider } from "@/providers/auth.provider";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <AuthProvider>
      <WrapperComponent>
        <ToastContainer />
        <SignupComponent />
      </WrapperComponent>
    </AuthProvider>
  );
};

export default page;
