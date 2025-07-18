"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface IUser {
  username: string;
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
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as IUser;
        setUserState(parsedUser);
      } catch {
        console.error("Invalid user session");
      }
    }
    setIsAuthChecked(true);
  }, []);
  useEffect(() => {
    if (!isAuthChecked) return;

    if (user && pathname !== "/dashboard") {
      router.push("/dashboard");
    } else if (!user && pathname === "/dashboard") {
      router.push("/");
    }
  }, [user, pathname, router, isAuthChecked]);

  const setUser = (newUser: IUser | null) => {
    if (newUser) {
      sessionStorage.setItem("user", JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem("user");
    }
    setUserState(newUser);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUserState(null);
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
