import { Dispatch, SetStateAction, useCallback } from "react";
import { useDebounce } from "./useDebounce";

type StateType = Record<string, string | null>;

function useDebouncedStateSetter<T extends StateType, K extends keyof T>(
  delay: number,
  setState: Dispatch<SetStateAction<T>>,
) {
  const debouncedStateSetter = useDebounce(
    useCallback(
      (key: K, val: string | null) => {
        setState((prev) => ({
          ...prev,
          [key]: val,
        }));
      },
      [setState],
    ),
    delay,
  );

  return debouncedStateSetter;
}

export default useDebouncedStateSetter;
