import useDebouncedStateSetter from "@/hooks/useDebouncedStateSetter";

import { useState } from "react";
import z from "zod";

export const ISignupState = z.object({
  username: z
    .string()
    .min(3, {
      message: "نام کاربری باید حداقل 3 کارکتر داشته باشد.",
    })
    .regex(/^(?=.*[A-Za-z])[A-Za-z][a-zA-Z0-9._-]*$/, {
      message:
        "نام کاربری باید شامل حداقل یک کارکتر باشد و نباید با عدد یا چیزی جز کارکتر شروع شود.",
    })
    .max(15, {
      message: "نام کاربری نباید طدلانی باشد (تا 15 کارکتر)",
    }),
  password: z
    .string()
    .min(8, {
      message: "نام کاربری باید حداقل 8 کارکتر داشته باشد.",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*[#$%=_.])[A-Za-z0-9#$%=_.]*$/, {
      message: "رمز عبور باید شامل حداقل یک حرف و یک کاراکتر خاص باشد.",
    })
    .max(25, {
      message: "کلمه عبور نباید طدلانی باشد (تا 25 کارکتر)",
    }),
  phone: z.string().regex(/^((0)?9\d{9}|989\d{9})$/, {
    message: "شماره موبایل باید طبق فرمت شماره های ایران باشد",
  }),
  email: z.email({
    message: "ایمیل باید معتبر باشد",
  }),
});

export type IState = z.infer<typeof ISignupState>;

const useSignupLogic = () => {
  const [signupState, setSignupState] = useState<IState>({
    username: "",
    password: "",
    phone: "",
    email: "",
  });

  const [zodErrors, setZodErrors] = useState<{
    username: string | null;
    password: string | null;
    phone: string | null;
    email: string | null;
  }>({
    username: null,
    password: null,
    phone: null,
    email: null,
  });

  // const { serverError, setServerError } = useServerError();

  const debouncedStateSetter = useDebouncedStateSetter(100, setSignupState);

  return {
    setZodErrors,
    zodErrors,
    debouncedStateSetter,
  };
};

export default useSignupLogic;
