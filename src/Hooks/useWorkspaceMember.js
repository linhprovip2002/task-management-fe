import { useQuery } from "@tanstack/react-query";
import { workspaceServices } from "../Services";
import { EQueryKeys } from "../constants";

export const useGetWorkspaceMember = (options = {}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_WORKSPACE_BY_USER],
    queryFn: () => workspaceServices.getWorkspaceByUser(options),
    ...{
      refetchOnWindowFocus: false
    }
  });

  return { workspaceInfo: data?.data, isLoading, isError, refetch };
};
