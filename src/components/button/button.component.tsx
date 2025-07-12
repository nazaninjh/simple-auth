import React, { CSSProperties } from "react";
import styles from "./button.module.scss";
const ButtonComponent = ({
  type = "button",
  content,
  disabled = false,
  customStyle,
}: {
  type?: "reset" | "button" | "submit";
  content: string;
  disabled?: boolean;
  customStyle?: CSSProperties;
}) => {
  return (
    <button
      className={styles.btn}
      type={type}
      style={customStyle}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default ButtonComponent;
