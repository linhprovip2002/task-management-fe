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
    queryKey: [EQueryKeys.getUser, isLoggedIn],
    queryFn: getProfile,
    ...{
      refetchOnWindowFocus: false,
      enabled: !!isLoggedIn
    }
  });

  return { userProfile, isLoading, isError, refetch };
};
