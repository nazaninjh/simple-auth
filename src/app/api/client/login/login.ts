import { axiosCustom } from "@/axios/axiosConfig";

export const login = async (values: {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  rememberMe: boolean;
}) => {
  try {
    const res = await axiosCustom.post("/users/login", values);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 400) {
      throw new Error("نام کاربری یا کلمه عبور اشتباه است!");
    }
    throw new Error("مشکلی پیش آمد، دوباره سعی کنید");
  }
};
