import { useQuery } from "@tanstack/react-query";
import { EQueryKeys } from "../constants";
import { getBoardPermission } from "../Services/API/apiBoardPermission";

export const useGetBoardPermission = (boardId) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_BOARD_PERMISSION, boardId],
    queryFn: () => getBoardPermission(boardId),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!boardId
    }
  });

  return { dataBoardPermission: data, isLoading, isError, refetch };
};
