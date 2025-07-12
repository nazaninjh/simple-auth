"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
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

  const [zodErrors, setZodErrors] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: "",
    password: "",
  });
  const [serverError, setServerError] = useState({ state: false, msg: "" });

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = ILoginState.safeParse(loginState);
    if (parsed.success) {
      setZodErrors({
        username: null,
        password: null,
      });
    } else {
      const zodErrPass = z.treeifyError(parsed.error).properties?.password;
      const zodErrUsername = z.treeifyError(parsed.error).properties?.username;

      if (zodErrPass) {
        setZodErrors({
          ...zodErrors,
          password: zodErrPass?.errors ? zodErrPass?.errors.toString() : "",
        });
        return;
      }
      if (zodErrUsername) {
        setZodErrors({
          ...zodErrors,
          username: zodErrUsername?.errors
            ? zodErrUsername?.errors.toString()
            : "",
        });
        return;
      }
    }
    try {
      const res = await fetch("/api/log-in", {
        method: "POST",
        body: JSON.stringify(loginState),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      if (res.ok) {
        console.log("ok", await res.json());
      } else if (res.status === 401) {
        setServerError({
          state: true,
          msg: "نام کاربری یا کلمه عبور اشتباه است!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedCheck = useDebounce(checkValidity, 200);
  const debouncedStateSet = useDebounce((type: keyof IState, val: string) => {
    setLoginState((prev) => {
      return {
        ...prev,
        [type]: val,
      };
    });
  }, 200);

  useEffect(() => {
    if (serverError.state) {
      toast.error(serverError.msg, {
        position: "bottom-center",
      });
    }
  }, [serverError.msg, serverError.state]);
  return {
    loginState,
    debouncedCheck,
    debouncedStateSet,
    zodErrors,

    handleSubmit,
  };
}

export default useLoginLogic;
