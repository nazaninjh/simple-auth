import React, { CSSProperties } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";
const ButtonComponent = ({
  type = "button",
  content,
  disabled = false,
  isPending,
  customStyle,
  onClick,
}: {
  type?: "reset" | "button" | "submit";
  content: string;
  disabled?: boolean;
  isPending?: boolean;
  customStyle?: CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx(
        styles.btn,
        disabled && styles.disabled,
        isPending && styles.loading,
      )}
      type={type}
      style={customStyle}
      disabled={disabled}
      onClick={onClick}
    >
      {isPending ? (
        <span className={styles.loader}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </span>
      ) : (
        content
      )}
    </button>
  );
};

export default ButtonComponent;
