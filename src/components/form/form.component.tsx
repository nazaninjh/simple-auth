import React from "react";
import styles from "./form.module.scss";

import IcRoundCallMissedOutgoing from "./IcRoundCallMissedOutgoing";
const FormComponent = ({
  children,
  title,
  subTitle,
}: {
  children: React.ReactNode;
  title: string;
  subTitle: string;
}) => {
  return (
    <form className={styles.form}>
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
