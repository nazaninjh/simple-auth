import { useState } from "react";
import z from "zod";

const ISignupState = z.object({
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

export type IState = z.infer<typeof ISignupState>;

const useSignupLogic = () => {
  const [signupState, setSignupState] = useState<IState>({
    username: "",
    password: "",
    phone: "",
  });
};

export default useSignupLogic;
