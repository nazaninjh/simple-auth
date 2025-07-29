import SignupComponent from "@/components/auth/login/signup/signup.component";
import WrapperComponent from "@/components/wrapper/wrapper.component";

import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <WrapperComponent>
      <ToastContainer />
      <SignupComponent />
    </WrapperComponent>
  );
};

export default page;
