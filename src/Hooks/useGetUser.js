import { useQuery } from "@tanstack/react-query";
import { userServices } from "../Services";
import { EQueryKeys } from "../constants";

const useGetUser = (options = {}) => {
  const {
    data: userInfo,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: [EQueryKeys.GET_USER, JSON.stringify(options)],
    queryFn: () => userServices.getUser(options),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!Object.keys(options).length
    }
  });

  return { userInfo, isLoading, isError, refetch };
};

export default useGetUser;
