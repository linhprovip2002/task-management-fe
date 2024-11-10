import { useQuery } from "@tanstack/react-query";
import { EQueryKeys } from "../constants";
import {
  getBoardPermission,
  getBoardRole
} from "../Services/API/apiBoardPermission";

export const useGetBoardPermission = (boardId, roleId) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_BOARD_PERMISSION, boardId, roleId],
    queryFn: () => getBoardPermission(boardId, roleId),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!boardId
    }
  });

  return { dataBoardPermission: data, isLoading, isError, refetch };
};

export const useGetBoardRole = (boardId) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_BOARD_ROLE, boardId],
    queryFn: () => getBoardRole(boardId),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!boardId
    }
  });

  return { dataBoardRole: data, isLoading, isError, refetch };
};
