"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import FormComponent from "../../../form/form.component";
import { InputComponent } from "../../../form/input.component";
import ButtonComponent from "../../../shared/button/button.component";
import CardParentComponent from "../../../shared/card-parent/cardParent.component";
import checkFormInputValidity from "@/functions/checkFormInputValidity";
import useSignupLogic, { ISignupState } from "./useSignupLogic";
import z from "zod";

type SignupValues = z.infer<typeof ISignupState>;

const SignupComponent = () => {
  const { setZodErrors, zodErrors, debouncedStateSetter, handleSubmit } =
    useSignupLogic();
  const userNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!userNameRef.current) return;
    userNameRef.current.focus();
  }, []);

  const onChangeFn = useCallback(
    <K extends keyof SignupValues>(val: string, type: K) => {
      checkFormInputValidity({
        zodObject: ISignupState,
        zodKey: type,
        newValue: val,
        setZodErrors,
        delay: 200,
      });

      debouncedStateSetter(type, val);
    },
    [debouncedStateSetter, setZodErrors],
  );

  const onBlur = useCallback(
    <K extends keyof SignupValues>(val: string, type: K) => {
      checkFormInputValidity({
        zodObject: ISignupState,
        zodKey: type,
        newValue: val,
        setZodErrors,
        delay: 200,
      });
    },
    [setZodErrors],
  );
  const inputs = useMemo(() => {
    return [
      {
        onBlur: (val: string) => onBlur(val, "username"),
        onChange: (val: string) => onChangeFn(val, "username"),
        title: "نام کابری: ",
        id: "username",
        type: "text",
        errorMsg: zodErrors.username,
      },
      {
        onBlur: (val: string) => onBlur(val, "password"),
        onChange: (val: string) => onChangeFn(val, "password"),
        title: "کلمه عبور: ",
        id: "password",
        type: "password",
        errorMsg: zodErrors.password,
      },
      {
        onBlur: (val: string) => onBlur(val, "phone"),
        onChange: (val: string) => onChangeFn(val, "phone"),
        title: "شماره همراه",
        id: "phone",
        type: "phone",
        errorMsg: zodErrors.phone,
      },
      {
        onBlur: (val: string) => onBlur(val, "email"),
        onChange: (val: string) => onChangeFn(val, "email"),
        title: "ایمیل",
        id: "email",
        type: "email",
        errorMsg: zodErrors.email,
      },
    ];
  }, [onBlur, onChangeFn, zodErrors]);
  return (
    <CardParentComponent>
      <FormComponent
        title="ثبت نام"
        subTitle="لطفا اطلاعات خود را وارد کنید"
        onSubmit={handleSubmit}
      >
        {inputs.map((item) => {
          return (
            <InputComponent
              ref={item.id === "username" ? userNameRef : undefined}
              key={item.id}
              title={item.title}
              id={item.id}
              type={item.type}
              onChange={item.onChange}
              onBlur={item.onBlur}
              errorMsg={item.errorMsg}
            />
          );
        })}
        <ButtonComponent content="ثبت نام" type="submit" />
      </FormComponent>
    </CardParentComponent>
  );
};

export default SignupComponent;
