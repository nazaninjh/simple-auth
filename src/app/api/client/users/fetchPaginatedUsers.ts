import { axiosCustom } from "@/axios/axiosConfig";
import { TGetPaginatedUsers } from "@/types/queries/users/getPaginatedUsers.type";

const fetchPaginatedUsers = async (options: TGetPaginatedUsers) => {
  const { pageNum, limit } = options;

  try {
    const queryParams = new URLSearchParams();
    if (pageNum) queryParams.append("page", pageNum.toString());
    if (limit) queryParams.append("limit", limit.toString());
    const queryString = queryParams.toString();

    const res = await axiosCustom(
      `/users/paginated?${queryString ? queryString : ""}`
    );
    return res.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);

    throw new Error("مشکلی پیش آمد، دوباره سعی کنید");
  }
};

export default fetchPaginatedUsers;
