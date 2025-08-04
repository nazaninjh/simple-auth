import createInfiniteUsersOptions from "@/query-options/users/createInfiniteUsersOptions";
import { useInfiniteQuery } from "@tanstack/react-query";

const useAdminDash = () => {
  const { data, fetchNextPage, fetchPreviousPage } = useInfiniteQuery(
    createInfiniteUsersOptions({
      options: { placeholderData: (prevData) => prevData },
    })
  );

  return {
    data,
    fetchNextPage,
    fetchPreviousPage,
  };
};

export default useAdminDash;
