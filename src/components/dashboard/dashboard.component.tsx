"use client";

import { useAuth } from "@/providers/auth.provider";
import CardParentComponent from "../shared/card-parent/cardParent.component";

import ButtonComponent from "../shared/button/button.component";
import styles from "./dashboard.module.scss";
import IcBaselineAccountCircle from "../../assets/icons/IcBaselineAccountCircle";

export const DashboardComponent = () => {
  const { user, logout } = useAuth();

  return (
    <CardParentComponent
      customStyle={{
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <IcBaselineAccountCircle width={100} height={100} />
        </div>

        <div className={styles.texts}>
          <span>سلام</span>
          {user && user.username ? user.username : ""}
          <span>خوش آمدید.</span>
        </div>
        <ButtonComponent content=" خروج از حساب" onClick={logout} />
      </div>
    </CardParentComponent>
  );
};
