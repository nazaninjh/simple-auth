import { IUser } from "@/types/user.type";

const fetchUserData = async (): Promise<IUser | null> => {
  let user: null | IUser = null;
  try {
    const res = await fetch("/api/users/extract-data-from-token", {
      cache: "no-store",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      user = data.payload;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);

    if (error.status === 401) {
      try {
        const refreshRes = await fetch("/api/users/refresh", {
          method: "POST",
          cache: "no-store",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (refreshRes.ok) {
          const res = await fetch("/api/users/extract-data-from-token", {
            cache: "no-store",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            user = data.payload;
          }
        }
      } catch (refreshError) {
        console.log("Refresh failed", refreshError);
        user = null;
      }
    }
  }

  return user;
};

export default fetchUserData;
