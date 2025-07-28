"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef } from "react";
import z from "zod";
import checkFormInputValidity from "@/functions/auth/checkFormInputValidity";
import FormComponent from "@/components/form/form.component";
import { InputComponent } from "@/components/form/input.component";
import CardParentComponent from "../../shared/card-parent/cardParent.component";
import ButtonComponent from "../../shared/button/button.component";
import useLoginLogic, { ILoginState } from "./useLoginLogic";

import styles from "./login.module.scss";

type LoginValues = z.infer<typeof ILoginState>;

const LoginComponent = () => {
  const {
    debouncedCheck,
    debouncedStateSetter,
    zodErrors,
    setZodErrors,
    handleSubmit,
    isPending,
  } = useLoginLogic();
  const userNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!userNameRef.current) return;
    userNameRef.current.focus();
  }, []);

  const onChangeFn = useCallback(
    <K extends keyof LoginValues>(val: string, type: K) => {
      checkFormInputValidity({
        zodObject: ILoginState,
        zodKey: type,
        newValue: val,
        setZodErrors,
        delay: 200,
      });

      debouncedStateSetter(type, val);
    },
    [debouncedStateSetter, setZodErrors],
  );

  const inputs = useMemo(() => {
    return [
      {
        title: "نام کابری: ",
        id: "username",
        type: "text",
        onBlur: (val: string) => debouncedCheck("username", val),
        onChange: (val: string) => onChangeFn(val, "username"),
        errorMsg: zodErrors.username,
      },
      {
        title: "کلمه عبور: ",
        id: "password",
        type: "password",
        onBlur: (val: string) => debouncedCheck("password", val),
        onChange: (val: string) => onChangeFn(val, "password"),
        errorMsg: zodErrors.password,
      },
    ];
  }, [debouncedCheck, onChangeFn, zodErrors.password, zodErrors.username]);

  return (
    <CardParentComponent>
      <FormComponent
        onSubmit={(e) => handleSubmit(e)}
        title="ورود"
        subTitle=" سلام، لطفا اطلاعات کاربری خود را وارد کنید."
      >
        {inputs.map((item) => {
          return (
            <InputComponent
              key={item.id}
              title={item.title}
              id={item.id}
              type={item.type}
              onBlur={item.onBlur}
              onChange={item.onChange}
              errorMsg={item.errorMsg}
              ref={item.id === "username" ? userNameRef : undefined}
            />
          );
        })}

        <ButtonComponent content="ورود" type="submit" isPending={isPending} />
      </FormComponent>
      <div className={styles["signup-container"]}>
        <span>ثبت نام نکرده اید؟</span>
        <Link href="/signup">ثبت نام</Link>
      </div>
    </CardParentComponent>
  );
};

export default LoginComponent;
