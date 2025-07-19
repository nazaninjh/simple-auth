"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { axiosCustom } from "@/axios/axiosConfig";
import { toast } from "react-toastify";

interface IUser {
  _id: string;
  username: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<IUser | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(() => {
    (async function fetchUser() {
      try {
        const res = await axiosCustom.get("/users/extract-data-from-token");

        setUser(res.data.payload);
        return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);

        if (error.status === 401) {
          try {
            const refreshRes = await axiosCustom.post("/users/refresh");

            if (refreshRes.status === 200) {
              const res = await axiosCustom.get(
                "/users/extract-data-from-token"
              );
              setUser(res.data.payload);
              return;
            }
          } catch (refreshError) {
            console.log("Refresh failed", refreshError);
            router.push("/");
          }
        }
      }
    })();

    setIsAuthChecked(true);
  }, [router]);
  useEffect(() => {
    if (!isAuthChecked) return;

    if (user && pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  }, [user, pathname, router, isAuthChecked]);

  const setUser = (newUser: IUser | null) => {
    setUserState(newUser);
  };

  const logout = async () => {
    try {
      const res = await axiosCustom.get("/users/logout");
      if (res.status === 200) {
        sessionStorage.removeItem("user");
        setUserState(null);
        toast.success("با موفقیت خارج شدید.", {
          position: "top-center",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }

    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
