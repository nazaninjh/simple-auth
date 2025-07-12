import LoginComponent from "@/components/login/login.component";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./page.module.scss";
const page = () => {
  return (
    <main className={styles.main}>
      <ToastContainer />
      <LoginComponent />
    </main>
  );
};

export default page;
