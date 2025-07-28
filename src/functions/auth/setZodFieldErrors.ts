import { Dispatch, SetStateAction } from "react";
import z from "zod";

export const setZodFieldErrors = (
  parsed: z.ZodSafeParseResult<Record<string, string | null>>,
  fieldList: string[],
  setZodErrors: Dispatch<SetStateAction<Record<string, string | null>>>,
) => {
  if (parsed.success) {
    fieldList.forEach((field: string) => {
      setZodErrors((prev: Record<string, string | null>) => ({
        ...prev,
        [field]: null,
      }));
    });
  } else {
    const zodErr = z.treeifyError(parsed.error).properties ?? {};

    for (const field of fieldList) {
      const errorField = zodErr[field];
      if (errorField && errorField.errors) {
        setZodErrors((prev: Record<string, string | null>) => ({
          ...prev,
          [field]: errorField.errors.toString(),
        }));
        return;
      }
    }
  }
};

export default setZodFieldErrors;
