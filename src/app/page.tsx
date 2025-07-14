import LoginComponent from "@/components/auth/login/login.component";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./page.module.scss";
import { AuthProvider } from "@/providers/auth.provider";
const page = () => {
  return (
    <AuthProvider>
      <main className={styles.main}>
        <ToastContainer />
        <LoginComponent />
      </main>
    </AuthProvider>
  );
};

export default page;
