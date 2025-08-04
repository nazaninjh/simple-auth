import signup from "@/app/api/client/signup/signup";
import { TParams } from "@/types/mutations/mutationParams";
import { mutationOptions, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";

type SignupVariables = {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
};

const createSignupOptions = ({
  params,
  options,
}: {
  params?: TParams;
  options?: UseMutationOptions<unknown, Error, SignupVariables>;
}) => {
  return mutationOptions<unknown, Error, SignupVariables>({
    mutationFn: signup,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message, {
        position: "bottom-center",
      });
    },
    onSuccess: () => {
      toast.success("با موفقیت ثبت نام شدید.", {
        position: "top-center",
      });
      if (params && params.refetchUser) {
        params.refetchUser();
      }
    },
    ...options,
  });
};

export default createSignupOptions;
