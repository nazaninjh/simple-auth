import styles from "./page.module.scss";

import LoginComponent from "@/components/login/login.component";
const page = () => {
  return (
    <main className={styles.main}>
      <LoginComponent />
    </main>
  );
};

export default page;
