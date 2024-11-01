import { useQuery } from "@tanstack/react-query";
import { workspaceServices } from "../Services";
import { EQueryKeys } from "../constants";

export const useGetWorkspaceMember = (workspaceId) => {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [EQueryKeys.GET_WORKSPACE_MEMBER, workspaceId],
    queryFn: () => workspaceServices.getWorkspaceMember(workspaceId),
    ...{
      refetchOnWindowFocus: false,
      enable: !!workspaceId
    }
  });

  return { workspaceMembers: data, isLoading, isError, isRefetching, refetch };
};
