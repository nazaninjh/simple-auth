import fetchPaginatedUsers from "@/app/api/client/users/fetchPaginatedUsers";
import { IUser } from "@/types/user.type";
import {
  infiniteQueryOptions,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

type IPaginatedData = {
  payload: {
    pageNum: number;
    userCount: number;
    hasMore: boolean;
    collection: IUser[];
  };
};

const createInfiniteUsersOptions = ({
  params,
  options,
}: {
  params?: { limit: number; page: number };
  options?: Omit<
    UseInfiniteQueryOptions<
      IPaginatedData,
      Error,
      {
        pageParams: number[];
        pages: IPaginatedData[];
      }
    >,
    "queryFn" | "queryKey" | "getNextPageParam" | "initialPageParam"
  >;
}) => {
  return infiniteQueryOptions<
    IPaginatedData,
    Error,
    {
      pageParams: number[];
      pages: IPaginatedData[];
    }
  >({
    queryKey: ["users"],
    queryFn: ({ pageParam }) =>
      fetchPaginatedUsers({
        pageNum: pageParam as number,
        limit: params ? params.limit : 5,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.payload.hasMore) {
        return lastPage.payload.pageNum + 1;
      }
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.payload.pageNum - 1;
    },

    ...options,
  });
};

export default createInfiniteUsersOptions;
