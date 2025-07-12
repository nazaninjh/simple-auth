"use client";
import { useAuth } from "@/providers/auth.provider";
import CardParentComponent from "../card-parent/cardParent.component";
import IcRoundCallMissedOutgoing from "@/assets/icons/IcRoundCallMissedOutgoing";

import styles from "./dashboard.module.scss";
import ButtonComponent from "../button/button.component";

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
          <IcRoundCallMissedOutgoing width={100} height={68} />
        </div>
        <div className={styles.texts}>
          <span>سلام</span>
          <span>{user?.firstName}</span>
          <span>خوش آمدید.</span>
        </div>
        <ButtonComponent
          content=" خروج از حساب"
          onClick={logout}
          customStyle={{ fontSize: "var(--fz-sm)" }}
        />
      </div>
    </CardParentComponent>
  );
};
