"use client";
import FormComponent from "@/components/form/form.component";
import InputComponent from "@/components/input/input.component";
import useLoginLogic from "./useLoginLogic";
import ButtonComponent from "../button/button.component";

import styles from "./login.module.scss";
const LoginComponent = () => {
  const { checkValidity, zodErrors } = useLoginLogic();

  const inputs = [
    {
      isFocused: true,
      title: "نام کابری: ",
      id: "username",
      type: "text",
      onBlur: (val: string) => checkValidity("username", val),
      onChange: (val: string) => checkValidity("username", val),
      errorMsg: zodErrors.username,
    },
    {
      isFocused: false,
      title: "کلمه عبور: ",
      id: "password",
      type: "password",
      onBlur: (val: string) => checkValidity("password", val),
      onChange: (val: string) => checkValidity("password", val),
      errorMsg: zodErrors.password,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <FormComponent
        title="ورود"
        subTitle=" سلام، لطفا اطلاعات کاربری خود را وارد کنید."
      >
        {inputs.map((item) => {
          return (
            <InputComponent
              key={item.id}
              isFocused={item.isFocused}
              title={item.title}
              id={item.id}
              type={item.type}
              onBlur={item.onBlur}
              onChange={item.onChange}
              errorMsg={item.errorMsg}
            />
          );
        })}

        <ButtonComponent content="ورود" type="submit" />
      </FormComponent>
    </div>
  );
};

export default LoginComponent;
