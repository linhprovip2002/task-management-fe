import { useQuery } from "@tanstack/react-query";
import { EQueryKeys } from "../constants";
import { getProfile } from "../Services";

export const useGetUserProfile = (isLoggedIn) => {
  const {
    data: userProfile,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: [EQueryKeys.GET_WORKSPACE_BY_USER, isLoggedIn],
    queryFn: () => getProfile,
    ...{
      refetchOnWindowFocus: true,
      enabled: !!isLoggedIn
    }
  });

  return { userProfile, isLoading, isError, refetch };
};
