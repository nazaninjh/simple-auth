import useDebouncedStateSetter from "@/hooks/useDebouncedStateSetter";

import { useAuth } from "@/providers/auth.provider";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
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
      message: "رمز عبور باید حداقل 8 کارکتر داشته باشد.",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*[#$%=_.])[A-Za-z0-9#$%=_.]*$/, {
      message: "رمز عبور باید شامل حداقل یک حرف و یک کاراکتر خاص باشد.",
    })
    .max(25, {
      message: "رمز عبور نباید طدلانی باشد (تا 25 کارکتر)",
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
  const { setUser } = useAuth();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const values = {
      username:
        formData.get("username")?.toString().trim() || signupState.username,
      password:
        formData.get("password")?.toString().trim() || signupState.password,
      phone: formData.get("phone")?.toString().trim() || signupState.phone,
      email: formData.get("email")?.toString().trim() || signupState.email,
    };

    console.log(values);

    const parsed = ISignupState.safeParse(values);

    if (parsed.success) {
      setZodErrors({
        username: null,
        password: null,
        phone: null,
        email: null,
      });
    } else {
      const zodErr = z.treeifyError(parsed.error).properties ?? {};

      const fieldList = ["password", "username", "email", "phone"] as const;
      for (const field of fieldList) {
        const errorField = zodErr[field];
        if (errorField && errorField.errors) {
          setZodErrors((prev) => ({
            ...prev,
            [field]: errorField.errors.toString(),
          }));
          return;
        }
      }
    }

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();

        toast.success("با موفقیت ثبت نام شدید.", {
          position: "top-center",
        });
        setUser(data.savedUser);
      } else if (res.status === 400) {
        toast.error(
          "این کاربر از قبل وجود دارد، شماره و ایمیل را دوباره وارد کنید.",
          {
            position: "bottom-center",
          },
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedStateSetter = useDebouncedStateSetter(100, setSignupState);

  return {
    setZodErrors,
    zodErrors,
    debouncedStateSetter,
    handleSubmit,
  };
};

export default useSignupLogic;
