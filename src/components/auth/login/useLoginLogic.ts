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
  phone: z
    .string()
    .regex(/^((0)?9\d{9}|989\d{9})$/, {
      message: "شماره موبایل باید طبق فرمت شماره های ایران باشد",
    })
    .optional()
    .or(z.literal("")),
});

export type IState = z.infer<typeof ILoginState>;

function useLoginLogic() {
  const { setUser } = useAuth();

  const [loginState, setLoginState] = useState<IState>({
    username: "",
    password: "",
    phone: "",
  });

  const [zodErrors, setZodErrors] = useState<{
    username: string | null;
    password: string | null;
    phone: string | null;
  }>({
    username: null,
    password: null,
    phone: null,
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = ILoginState.safeParse(loginState);
    if (parsed.success) {
      setZodErrors({
        username: null,
        password: null,
        phone: null,
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

    const reqBody = {
      username: loginState.username,
      password: loginState.password,
    };
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
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
