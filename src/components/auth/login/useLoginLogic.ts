"use client";
import { FormEvent, useState } from "react";
import z from "zod";
import { useDebounce } from "@/hooks/useDebounce";

import { toast } from "react-toastify";
import useDebouncedStateSetter from "@/hooks/useDebouncedStateSetter";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/api/client/login/login";
import { setZodFieldErrors } from "@/functions/auth/setZodFieldErrors";
import { useAuth } from "@/providers/auth.provider";

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
  const { refetchUser } = useAuth();
  const mutation = useMutation({
    mutationFn: login,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message, {
        position: "bottom-center",
      });
    },
    onSuccess: () => {
      refetchUser();
    },
  });

  const [loginState, setLoginState] = useState<IState>({
    username: "",
    password: "",
  });

  const [zodErrors, setZodErrors] = useState<Record<string, string | null>>({
    username: null,
    password: null,
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

    setZodFieldErrors(parsed, ["username", "password"], setZodErrors);

    mutation.mutate(values);
  };

  const debouncedCheck = useDebounce(checkValidity, 200);
  const debouncedStateSetter = useDebouncedStateSetter(100, setLoginState);

  return {
    loginState,
    zodErrors,
    setZodErrors,
    handleSubmit,
    debouncedCheck,
    debouncedStateSetter,
    isPending: mutation.isPending,
  };
}

export default useLoginLogic;
