import SignupComponent from "@/components/signup/signup.component";
import WrapperComponent from "@/components/wrapper/wrapper.component";
import { AuthProvider } from "@/providers/auth.provider";

const page = () => {
  return (
    <AuthProvider>
      <WrapperComponent>
        <SignupComponent />
      </WrapperComponent>
    </AuthProvider>
  );
};

export default page;
