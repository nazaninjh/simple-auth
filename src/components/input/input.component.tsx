"use client";
import { HTMLInputTypeAttribute, useEffect, useRef } from "react";
import styles from "./input.module.scss";

interface IParams {
  title: string;
  type: HTMLInputTypeAttribute;
  id: string;
  isFocused?: boolean;
}
const InputComponent = (params: IParams) => {
  const { title, type, id, isFocused } = params;
  const inputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    if (!inputRef.current || !isFocused) return;

    inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["input-group"]}>
      <label htmlFor={id}>{title} </label>
      <input type={type} name={id} id={id} ref={inputRef} />
    </div>
  );
};

export default InputComponent;
