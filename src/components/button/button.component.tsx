import React, { CSSProperties } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";
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
      className={clsx(styles.btn, disabled && styles.disabled)}
      type={type}
      style={customStyle}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default ButtonComponent;
