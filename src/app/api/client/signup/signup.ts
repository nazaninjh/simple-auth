import { axiosCustom } from "@/axios/axiosConfig";

const signup = async (values: {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
}) => {
  try {
    const res = await axiosCustom.post("/users/signup", values);
    return res.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 400) {
      throw new Error(
        "این کاربر از قبل وجود دارد، شماره و ایمیل را دوباره وارد کنید.",
      );
    }
    throw new Error("مشکلی پیش آمد، دوباره سعی کنید");
  }
};

export default signup;
