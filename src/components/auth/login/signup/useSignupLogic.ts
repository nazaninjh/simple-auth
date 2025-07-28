import signup from "@/app/api/client/signup/signup";
import setZodFieldErrors from "@/functions/auth/setZodFieldErrors";
import useDebouncedStateSetter from "@/hooks/useDebouncedStateSetter";

import { useAuth } from "@/providers/auth.provider";
import { useMutation } from "@tanstack/react-query";

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

  const mutation = useMutation({
    mutationFn: signup,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message, {
        position: "bottom-center",
      });
    },
    onSuccess: (data) => {
      console.log(data);

      toast.success("با موفقیت ثبت نام شدید.", {
        position: "top-center",
      });

      if (data && typeof data === "object" && "savedUser" in data) {
        console.log("saving...");

        setUser({ username: data.savedUser as string });
      }
    },
  });

  const [signupState, setSignupState] = useState<IState>({
    username: "",
    password: "",
    phone: "",
    email: "",
  });

  const [zodErrors, setZodErrors] = useState<Record<string, string | null>>({
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

    const parsed = ISignupState.safeParse(values);

    setZodFieldErrors(
      parsed,
      ["password", "username", "email", "phone"],
      setZodErrors,
    );

    mutation.mutate(values);
  };

  const debouncedStateSetter = useDebouncedStateSetter(100, setSignupState);

  return {
    setZodErrors,
    zodErrors,
    debouncedStateSetter,
    handleSubmit,
    isPending: mutation.isPending,
  };
};

export default useSignupLogic;
