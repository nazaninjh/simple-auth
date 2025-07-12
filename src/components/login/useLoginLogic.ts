"use client";
import { useState } from "react";
import z from "zod";

const ILoginState = z.object({
  username: z.string().min(1, {
    message: "نام کاربری نباید خالی باشد!",
  }),
  password: z.string().min(1, {
    message: "کلمه عبور نباید خالی باشد!",
  }),
});

export interface IState {
  username: string;
  password: string;
}
function useLoginLogic() {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const [zodErrors, setZodErrors] = useState({
    username: "",
    password: "",
  });

  const checkValidity = <K extends keyof IState>(
    type: keyof IState,
    value: IState[K]
  ) => {
    const parsed = ILoginState.shape[type].safeParse(value);

    if (parsed.success) {
      setZodErrors({
        ...zodErrors,
        [type]: null,
      });
    } else {
      const zodErr = z.treeifyError(parsed.error).errors.toString();

      if (zodErr) {
        setZodErrors({
          ...zodErrors,
          [type]: zodErr,
        });
      }
    }
  };

  return {
    loginState,
    setLoginState,
    checkValidity,
    zodErrors,
  };
}

export default useLoginLogic;
