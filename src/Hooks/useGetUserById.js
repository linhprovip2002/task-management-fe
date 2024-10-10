import { useQuery } from "@tanstack/react-query";
import { userServices } from "../Services";
import { EQueryKeys } from "../constants";

const useGetUserById = (id) => {
  const {
    data: userInfo,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: [EQueryKeys.GET_USER_BY_ID, id],
    queryFn: () => userServices.getUserById(id),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!id
    }
  });

  return { userInfo, isLoading, isError, refetch };
};

export default useGetUserById;
