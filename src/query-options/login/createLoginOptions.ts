import { login } from "@/app/api/client/login/login";
import { TParams } from "@/types/mutations/mutationParams";
import { mutationOptions, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";

type LoginVariables = {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  rememberMe: boolean;
};

const createLoginOptions = ({
  params,
  options,
}: {
  params?: TParams;
  options?: UseMutationOptions<unknown, Error, LoginVariables>;
}) => {
  return mutationOptions<unknown, Error, LoginVariables>({
    mutationFn: login,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message, {
        position: "bottom-center",
      });
    },
    onSuccess: () => {
      if (params?.refetchUser) {
        params.refetchUser();
      }
    },
    ...options,
  });
};

export default createLoginOptions;
