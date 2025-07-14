import { forwardRef, HTMLInputTypeAttribute } from "react";
import clsx from "clsx";
import styles from "./input.module.scss";

interface IProps {
  title: string;
  type: HTMLInputTypeAttribute;
  id: string;
  onBlur?: (val: string) => void;
  onChange?: (val: string) => void;
  errorMsg?: string | null;
}

export const InputComponent = forwardRef<HTMLInputElement, IProps>(
  (props, ref) => {
    const { title, type, id, onBlur, onChange, errorMsg } = props;

    return (
      <div className={styles["input-group"]}>
        <label htmlFor={id}>{title}</label>
        <input
          ref={ref}
          type={type}
          name={id}
          id={id}
          onBlur={(e) => onBlur?.(e.target.value)}
          onChange={(e) => onChange?.(e.target.value)}
          className={clsx(
            errorMsg ? styles.error : errorMsg === null ? styles.success : ""
          )}
        />
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      </div>
    );
  }
);
InputComponent.displayName = "InputComponent";
