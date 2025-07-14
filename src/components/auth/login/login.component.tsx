"use client";
import FormComponent from "@/components/form/form.component";
import { InputComponent } from "@/components/form/input.component";
import useLoginLogic from "./useLoginLogic";
import ButtonComponent from "../../shared/button/button.component";

import CardParentComponent from "../../shared/card-parent/cardParent.component";
import { useEffect, useMemo, useRef } from "react";

const LoginComponent = () => {
  const { debouncedCheck, debouncedStateSet, zodErrors, handleSubmit } =
    useLoginLogic();
  const userNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log(userNameRef);

    if (!userNameRef.current) return;
    userNameRef.current.focus();
  }, []);

  const inputs = useMemo(() => {
    return [
      {
        title: "نام کابری: ",
        id: "username",
        type: "text",
        onBlur: (val: string) => debouncedCheck("username", val),
        onChange: (val: string) => {
          debouncedCheck("username", val);
          debouncedStateSet("username", val);
        },
        errorMsg: zodErrors.username,
      },
      {
        title: "کلمه عبور: ",
        id: "password",
        type: "password",
        onBlur: (val: string) => debouncedCheck("password", val),
        onChange: (val: string) => {
          debouncedCheck("password", val);
          debouncedStateSet("password", val);
        },
        errorMsg: zodErrors.password,
      },
      {
        title: "شماره موبایل (اختیاری): ",
        id: "phone",
        type: "tel",
        onBlur: (val: string) => debouncedCheck("phone", val),
        onChange: (val: string) => {
          debouncedCheck("phone", val);
          debouncedStateSet("phone", val);
        },
        errorMsg: zodErrors.phone,
      },
    ];
  }, [debouncedCheck, debouncedStateSet, zodErrors]);

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

        <ButtonComponent content="ورود" type="submit" />
      </FormComponent>
    </CardParentComponent>
  );
};

export default LoginComponent;
