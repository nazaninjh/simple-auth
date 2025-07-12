"use client";

import { AuthProvider } from "@/providers/auth.provider";
import styles from "./page.module.scss";

import { DashboardComponent } from "@/components/dashboard/dashboard.component";
const page = () => {
  return (
    <AuthProvider>
      <main className={styles.main}>
        <DashboardComponent />
      </main>
    </AuthProvider>
  );
};

export default page;
