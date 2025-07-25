import React, { FormEvent } from "react";
import styles from "./form.module.scss";

import IcRoundCallMissedOutgoing from "@/assets/icons/IcRoundCallMissedOutgoing";
export const FormComponent = ({
  children,
  title,
  subTitle,
  onSubmit,
}: {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.icon}>
        <IcRoundCallMissedOutgoing width={100} height={68} />
      </div>
      <div className={styles.texts}>
        <p className={styles.title}>{title}</p>
        <p className={styles["sub-title"]}>{subTitle}</p>
      </div>
      <div className={styles.children}>{children}</div>
    </form>
  );
};

export default FormComponent;
