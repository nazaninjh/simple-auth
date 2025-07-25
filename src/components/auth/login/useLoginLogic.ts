"use client";
import { FormEvent, useEffect, useState } from "react";
import z from "zod";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/providers/auth.provider";
import { toast } from "react-toastify";
import useDebouncedStateSetter from "@/hooks/useDebouncedStateSetter";

export const ILoginState = z.object({
  username: z.string().min(1, {
    message: "نام کاربری نباید خالی باشد!",
  }),
  password: z.string().min(1, {
    message: "کلمه عبور نباید خالی باشد!",
  }),
});

export type IState = z.infer<typeof ILoginState>;

function useLoginLogic() {
  const { setUser } = useAuth();

  const [loginState, setLoginState] = useState<IState>({
    username: "",
    password: "",
  });

  const [zodErrors, setZodErrors] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: null,
    password: null,
  });

  const [serverError, setServerError] = useState({
    state: false,
    msg: "",
  });

  const checkValidity = <K extends keyof IState>(type: K, value: IState[K]) => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = {
      username: formData.get("username")
        ? formData.get("username")
        : loginState.username,
      password: formData.get("password")
        ? formData.get("password")
        : loginState.password,
      rememberMe: true,
    };
    const parsed = ILoginState.safeParse(values);
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
    setServerError({
      state: false,
      msg: "",
    });

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.savedUser);
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
  const debouncedStateSetter = useDebouncedStateSetter(100, setLoginState);
  useEffect(() => {
    if (serverError.state) {
      toast.error(serverError.msg, {
        position: "bottom-center",
      });
    }
  }, [serverError]);

  return {
    loginState,
    zodErrors,
    setZodErrors,
    handleSubmit,
    debouncedCheck,
    debouncedStateSetter,
  };
}

export default useLoginLogic;
