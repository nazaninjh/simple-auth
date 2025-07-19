import { ZodObject, ZodType, z } from "zod";

interface IProps<
  T extends Record<string, ZodType>,
  K extends keyof T,
  State extends Record<string, string | null>,
> {
  zodObject: ZodObject<T>;
  zodKey: K;
  newValue: string;
  setZodErrors: React.Dispatch<React.SetStateAction<State>>;
  delay: number;
}

const checkFormInputValidity = <
  T extends Record<string, ZodType>,
  K extends keyof T,
  State extends Record<string, string | null>,
>({
  zodObject,
  zodKey,
  newValue,
  setZodErrors,
  delay,
}: IProps<T, K, State>) => {
  let timeoutId = null;
  const callback = () => {
    const schema = zodObject.shape[zodKey] as ZodType;

    const parsed = schema.safeParse(newValue);

    if (parsed.success) {
      setZodErrors((prev) => ({
        ...prev,
        [zodKey as string]: null,
      }));
    } else {
      const zodErr = z.treeifyError(parsed.error).errors.toString();
      if (zodErr) {
        setZodErrors((prev) => ({
          ...prev,
          [zodKey as string]: zodErr,
        }));
      }
    }
  };

  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    callback();
  }, delay);
};

export default checkFormInputValidity;
