"use client";
import { HTMLInputTypeAttribute, useEffect, useRef } from "react";
import styles from "./input.module.scss";
import clsx from "clsx";

interface IParams {
  title: string;
  type: HTMLInputTypeAttribute;
  id: string;
  isFocused?: boolean;
  onBlur?: (val: string) => void;
  onChange?: (val: string) => void;
  errorMsg?: string;
}
const InputComponent = (params: IParams) => {
  const { title, type, id, isFocused, onBlur, onChange, errorMsg } = params;
  const inputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    if (!inputRef.current || !isFocused) return;

    inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["input-group"]}>
      <label htmlFor={id}>{title} </label>
      <input
        type={type}
        name={id}
        id={id}
        ref={inputRef}
        onBlur={(e) => onBlur?.(e.target.value)}
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx(
          errorMsg ? styles.error : errorMsg === null ? styles.success : ""
        )}
      />
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
};

export default InputComponent;
