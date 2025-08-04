"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { axiosCustom } from "@/axios/axiosConfig";
import { toast } from "react-toastify";
import { IUser } from "@/types/user.type";
import fetchUserData from "@/helpers/client/users/fetchUserData";

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<IUser | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const didInit = useRef(false);

  const fetchAndSetUser = useCallback(async () => {
    const fetchedUser = await fetchUserData();
    setUserState(fetchedUser);

    if (
      fetchedUser &&
      fetchedUser.username.toLowerCase() === "admin" &&
      !pathname.startsWith("/dashboard")
    ) {
      router.push("/dashboard/admin");
    } else if (fetchedUser && !pathname.startsWith("/dashboard")) {
      router.push("/dashboard");
    } else if (!fetchedUser && pathname.startsWith("/dashboard")) {
      router.push("/");
    }
  }, [pathname, router]);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    fetchAndSetUser();
  }, [fetchAndSetUser, pathname, router]);

  useEffect(() => {
    if (!shouldRefetch) return;

    fetchAndSetUser().finally(() => {
      setShouldRefetch(false);
    });
  }, [fetchAndSetUser, shouldRefetch]);

  const setUser = (newUser: IUser | null) => {
    setUserState(newUser);
  };

  const refetchUser = () => {
    setShouldRefetch(true);
  };

  const logout = async () => {
    try {
      const res = await axiosCustom.get("/users/logout");

      if (res.status === 200) {
        setUser(null);
        toast.success("با موفقیت خارج شدید.", {
          position: "top-center",
        });
        router.replace("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "خطا در خروج", {
        position: "bottom-center",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
